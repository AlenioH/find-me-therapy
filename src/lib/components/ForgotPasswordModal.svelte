<script>
  let email = '';
  let successMessage = '';
  let errorMessage = '';

  export let closeModal = () => {};

  const handleClose = () => {
    closeModal();
    successMessage = '';
    errorMessage = '';
  };

  const handleSubmit = async () => {
    successMessage = '';
    errorMessage = '';

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'Fehler beim Zurücksetzen des Passworts.'
        );
      }

      if (data.status >= 400) {
        errorMessage = data.error || 'Fehler beim Zurücksetzen des Passworts.';
      }
      successMessage = data.message;
    } catch (error) {
      errorMessage = 'Ein unerwarteter Fehler ist aufgetreten.';
    }
  };
</script>

<div
  class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
>
  <div class="modal-content bg-white rounded-lg w-96 p-6 relative">
    <button
      class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      on:click={handleClose}>&times;</button
    >

    <h2 class="text-2xl font-bold mb-4 text-center">Passwort vergessen?</h2>
    <p class="text-gray-600 text-sm text-center mb-4">
      Gib deine E-Mail-Adresse ein, um einen Link zum Zurücksetzen deines
      Passworts zu erhalten.
    </p>

    <form on:submit|preventDefault={handleSubmit}>
      <input
        type="email"
        placeholder="E-Mail-Adresse"
        bind:value={email}
        class="w-full p-2 border rounded mb-2"
        required
      />
      <button
        type="submit"
        class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >Passwort zurücksetzen</button
      >
    </form>

    {#if successMessage}
      <p class="text-green-500 text-sm mt-2">{successMessage}</p>
    {/if}
    {#if errorMessage}
      <p class="text-red-500 text-sm mt-2">{errorMessage}</p>
    {/if}
  </div>
</div>
