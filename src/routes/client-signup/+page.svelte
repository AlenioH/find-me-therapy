<script>
  import bcrypt from 'bcryptjs';
  import LoginInfoForm from '$lib/components/LoginInfoForm.svelte';

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

  let resendEmail = () => {
    // Add logic to handle email resend
    console.log('Resend email logic goes here');
  };
</script>

<div class="max-w-lg mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
  {#if isSuccess}
    <div class="text-center">
      <div class="text-6xl text-orange-500 mb-6 animate-bounce">🎉</div>

      <h1 class="text-3xl font-bold text-gray-800 mb-4 animate-fadeIn">
        Danke für deine Anmeldung!
      </h1>

      <p class="text-lg text-gray-600 animate-fadeIn animation-delay-3">
        Eine Bestätigungs-E-Mail wurde an deine Adresse gesendet. Es kann einige
        Minuten dauern, bis sie ankommt. Bitte prüfe auch deinen Spam-Ordner.
        Falls du die E-Mail nicht erhalten hast, kannst du sie erneut anfordern.
      </p>

      <button
        on:click={resendEmail}
        class="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Bestätigungs-E-Mail erneut senden
      </button>
    </div>
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
