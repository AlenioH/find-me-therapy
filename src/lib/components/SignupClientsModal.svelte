<script>
  export let showModal = false;
  export let closeModal = () => {};
  export let title = 'Modal Title';

  let email = '';
  let password = '';
  let name = '';

  const handleClose = () => {
    closeModal();
  };

  // close modal when clicking outside the modal
  const handleOutsideClick = (event) => {
    const modalContent = event.target.closest('.modal-content');
    if (!modalContent) {
      closeModal();
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch('/api/create-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, role: 'client' }),
    });

    if (response.ok) {
      alert('User created successfully');
      closeModal();
    } else {
      alert('Failed to create user');
    }
  }
</script>

{#if showModal}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
    on:click={handleOutsideClick}
    on:keydown={(e) =>
      e.key === 'Enter' || e.key === ' ' ? handleClose() : null}
    aria-label="Close modal"
    role="button"
    tabindex="0"
  >
    <div class="modal-content bg-white rounded-lg w-96 p-6 relative">
      <button
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        on:click={handleClose}
      >
        &times;
      </button>

      <h2 class="text-2xl font-bold mb-4 text-center">{title}</h2>

      <form on:submit={handleSubmit}>
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <input
            type="text"
            id="name"
            bind:value={name}
            class="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            type="email"
            id="email"
            bind:value={email}
            class="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            type="password"
            id="password"
            bind:value={password}
            class="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div class="text-center mt-4">
          <button
            type="submit"
            class="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-400"
          >
            Registrieren
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
