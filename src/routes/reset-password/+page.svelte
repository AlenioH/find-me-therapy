<script>
  import PasswordInputs from "$lib/components/PasswordInputs.svelte";

  export let data;
  let password = '';
  let confirmPassword = '';
  let errorMessage = '';
  let successMessage = '';

  let errors = {
    password: '',
    confirmPassword: '',
  };


  const validate = () => {
  errors = {
    password: validatePassword(password)
      ? ''
      : 'Password must be at least 8 characters long and contain 1 uppercase, 1 lowercase, and 1 special character',
    confirmPassword:
      password === confirmPassword
        ? ''
        : 'Passwords do not match',
  };

  return Object.values(errors).every((error) => error === ''); // Form is valid if there are no errors
};

  const validatePassword = (password) => {
    // password must be at least 8 characters long, with at least 1 uppercase letter, 1 lowercase letter, and 1 special character
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_])[A-Za-z\d!@#$%^&*_]{8,}$/;
    return re.test(password);
  };

  const handleReset = async () => {

    if (!validate()) return;

    if (!data.token) {
      errorMessage = 'Kein gültiger Token.';
      return;
    }

    if (password !== confirmPassword) {
      errorMessage = 'Passwörter stimmen nicht überein.';
      return;
    }

    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: data.token, password }),
      });

      const responseData = await res.json();

      if (res.ok) {
        successMessage = responseData.message;
        errorMessage = '';
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        errorMessage = responseData.error || 'Fehler beim Zurücksetzen.';
      }
    } catch (error) {
      errorMessage = 'Ein unerwarteter Fehler ist aufgetreten.';
    }
  };
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
    {#if data.error}
      <p class="text-red-500 text-center">{data.error}</p>
    {:else}
      <h2 class="text-2xl font-semibold text-center mb-4">Passwort zurücksetzen</h2>

      <form on:submit|preventDefault={handleReset} class="space-y-4">
        <PasswordInputs bind:password={password} bind:confirmPassword={confirmPassword} {errors} />


        {#if errorMessage}
          <p class="text-red-500 text-sm">{errorMessage}</p>
        {/if}
        {#if successMessage}
          <p class="text-green-500 text-sm">{successMessage}</p>
        {/if}

        <button
          type="submit"
          class="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Passwort zurücksetzen
        </button>
      </form>
    {/if}
  </div>
</div>
