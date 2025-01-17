<script>
  import LoginInfoForm from './LoginInfoForm.svelte';
  import { goto } from '$app/navigation';

  export let showModal = false;
  export let closeModal = () => {};
  export let title = 'Modal Title';
  // @ts-ignore
  let formComponent;

  const saltRounds = 10; //for bcrypt

  let userInfo = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  // close modal when clicking outside the modal
  const handleClose = () => {
    clearForm();
    closeModal();
  };

  const clearForm = () => {
    // formElement.reset();
    // @ts-ignore
    formComponent.triggerReset();
  };

  const handleOutsideClick = (event) => {
    const modalContent = event.target.closest('.modal-content');
    if (!modalContent) {
      clearForm();
      closeModal();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/login-therapist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in the request
        body: JSON.stringify({
          email: userInfo.email,
          password: userInfo.password,
        }),
      });

      closeModal();
      goto('/my-profile');

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      console.log('Login successful');
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };
</script>

{#if showModal}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
    on:click={handleOutsideClick}
    on:keydown={(e) => (e.key === 'Escape' ? handleClose() : null)}
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

      <LoginInfoForm
        bind:this={formComponent}
        {userInfo}
        {handleSubmit}
        buttonText="Login"
        formType={'login'}
      />
    </div>
  </div>
{/if}
