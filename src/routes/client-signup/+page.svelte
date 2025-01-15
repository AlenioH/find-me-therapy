<script>
  import { goto } from '$app/navigation';
  import bcrypt from 'bcryptjs';
  import LoginInfoForm from "$lib/components/LoginInfoForm.svelte";

  const saltRounds = 10; //for bcrypt

  let userInfo = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  // Reference to the form component
  // @ts-ignore
  let formComponent;

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
        goto('/signup-success', {replaceState: true});
      } else {
        alert('Failed to create user');
      }
    } else {
      console.log('Form contains errors');
    }
  };
</script>

<div class="max-w-lg mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
  <h2 class="text-2xl font-bold mb-4 text-center">Registrieren</h2>

  <LoginInfoForm
    bind:this={formComponent}
    {userInfo}
    {handleSubmit}
    buttonText="Registrieren"
  />
</div>
