<script>
  import bcrypt from 'bcryptjs';
  import LoginInfoForm from './LoginInfoForm.svelte';

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

  const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // @ts-ignore
    if (formComponent.triggerValidation()) {
      const hashedPassword = await hashPassword(userInfo.password);
      const response = await fetch('/api/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userInfo.email,
          password: hashedPassword,
          name: userInfo.name,
          role: 'client',
        }),
      });

      if (response.ok) {
        alert('User created successfully');
        clearForm();
        closeModal();
      } else {
        alert('Failed to create user');
      }
    } else {
      console.log('Form contains errors');
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
        buttonText="Registrieren"
      />
    </div>
  </div>
{/if}
