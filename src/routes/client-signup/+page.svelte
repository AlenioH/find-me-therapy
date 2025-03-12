<script>
  import bcrypt from 'bcryptjs';
  import LoginInfoForm from '$lib/components/LoginInfoForm.svelte';
  import SuccessMessage from '$lib/components/SuccessMessage.svelte';

  const saltRounds = 10; //for bcrypt

  let isSuccess = false;
  let isLoading = false;
  let errorMessage = '';

  let userInfo = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  // Reference to the form component
  let formComponent;

  const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formComponent.triggerValidation()) {
      isLoading = true;
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
        isSuccess = true;
        alert('User created successfully');
      } else {
        const result = await response.json();
        errorMessage = result.message || 'Failed to create user';
        alert('Failed to create user');
      }
      isLoading = false;
    } else {
      console.log('Form contains errors');
    }
  };

</script>

<div class="max-w-lg mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
  {#if isSuccess}
  <SuccessMessage role="client" email={userInfo.email}/>

  {:else}
    <h2 class="text-2xl font-bold mb-4 text-center">Registrieren</h2>
    <LoginInfoForm
      bind:this={formComponent}
      {userInfo}
      {handleSubmit}
      buttonText="Registrieren"
    />
  {/if}

  {#if errorMessage}
    <div class="text-red-500 mt-4 text-center">
      {errorMessage}
    </div>
  {/if}

  {#if isLoading}
    <div class="text-center mt-4">Lade...</div>
  {/if}
</div>
