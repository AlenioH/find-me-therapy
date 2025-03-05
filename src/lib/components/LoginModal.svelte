<script>
  import { goto } from '$app/navigation';
  import { updateUser } from '$lib/stores';
  import LoginInfoForm from './LoginInfoForm.svelte';

  export let showModal = false;
  export let closeModal = () => {};
  export let title = 'Login';
  // @ts-ignore
  let formComponent;
  let successMessage = '';
  let errorMessage = '';
  let showResend = false;

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
      const response = await fetch('/api/login', {
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

      if (response.ok) {
        closeModal();
        const data = await response.json();
        updateUser(data);

        goto('/my-profile');
      } else {
        const data = await response.json();
        errorMessage = data.error;
        showResend = data.error.includes('E-Mail nicht verifiziert');
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      console.log('Anmeldung erfolgreich');
    } catch (error) {
      console.error('Anmeldung fehlgeschlagen:', error.message);
    }
  };

  const resendVerification = async () => {
    try {
      const res = await fetch('/api/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userInfo.email }),
      });

      const data = await res.json();

      if (res.ok) {
        successMessage =
          data.message || 'Verifizierungs-E-Mail wurde erneut gesendet.';
        errorMessage = '';
      } else {
        successMessage = '';
        errorMessage =
          data.error ||
          'Fehler beim erneuten Senden der Verifizierungs-E-Mail.';
      }
    } catch (error) {
      console.error(
        'Fehler beim erneuten Senden der Verifizierungs-E-Mail:',
        error
      );
      successMessage = '';
      errorMessage = 'Fehler beim erneuten Senden der Verifizierungs-E-Mail.';
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
      {#if successMessage}
        <p class="text-green-500 text-sm mt-2">{successMessage}</p>
      {/if}

      {#if errorMessage}
        <p class="text-red-500 text-sm mt-2">{errorMessage}</p>
      {/if}

      {#if showResend}
        <button
          class="text-blue-500 mt-2 hover:underline"
          on:click={resendVerification}
        >
          Verifizierungs-E-Mail erneut senden
        </button>
      {/if}
    </div>
  </div>
{/if}
