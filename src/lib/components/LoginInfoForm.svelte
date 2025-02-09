<script>
  export let buttonText = '';
  export let handleSubmit;
  export let userInfo;
  export let formType;
  // @ts-ignore
  let formElement;

  let errors = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  };

  let showPassword = false;
  let showConfirmPassword = false;

  const validate = () => {
    errors = {
      email: validateEmail(userInfo.email) ? '' : 'Invalid email format',
      password: validatePassword(userInfo.password)
        ? ''
        : 'Password must be at least 8 characters long and contain 1 uppercase, 1 lowercase, and 1 special character',
      confirmPassword:
        userInfo.password === userInfo.confirmPassword
          ? ''
          : 'Passwords do not match',
      name: userInfo.name.trim() ? '' : 'Name is required',
    };
    return Object.values(errors).every((error) => error === ''); // Form is valid if there are no errors
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    // password must be at least 8 characters long, with at least 1 uppercase letter, 1 lowercase letter, and 1 special character
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return re.test(password);
  };

  //expose the validation method to the parent
  export const triggerValidation = () => {
    return validate();
  };

  //expose the reset method to the parent
  export const triggerReset = () => {
    // @ts-ignore
    formElement.reset();
  };

  $: if (showPassword) {
    setTimeout(() => (showPassword = false), 5000); // auto-hide after 5 seconds
  }
</script>

<form bind:this={formElement} on:submit={handleSubmit}>
  {#if formType !== 'login'}
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700"
        >Name</label
      >
      <input
        type="text"
        id="name"
        bind:value={userInfo.name}
        class="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
        required
      />
      {#if errors.name}
        <p class="text-red-500 text-sm">{errors.name}</p>
      {/if}
    </div>
  {/if}

  <div class="mb-4">
    <label for="email" class="block text-sm font-medium text-gray-700"
      >Email</label
    >
    <input
      type="email"
      id="email"
      bind:value={userInfo.email}
      class="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
      required
    />
    {#if errors.email}
      <p class="text-red-500 text-sm">{errors.email}</p>
    {/if}
  </div>

  <div class="mb-4 relative">
    <label for="password" class="block text-sm font-medium text-gray-700"
      >Password</label
    >
    <input
      type={showPassword ? 'text' : 'password'}
      id="password"
      bind:value={userInfo.password}
      class="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 pr-10"
      required
      on:copy|preventDefault
      on:paste|preventDefault
      on:cut|preventDefault
    />
    <button
      type="button"
      class="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
      on:click={() => (showPassword = !showPassword)}
    >
      {#if showPassword}
        👁️
      {:else}
        👁️‍🗨️
      {/if}
    </button>
    {#if errors.password}
      <p class="text-red-500 text-sm">{errors.password}</p>
    {/if}
  </div>

  {#if formType !== 'login'}
    <div class="mb-4 relative">
      <label
        for="confirmPassword"
        class="block text-sm font-medium text-gray-700">Confirm Password</label
      >
      <input
        type={showConfirmPassword ? 'text' : 'password'}
        id="confirmPassword"
        bind:value={userInfo.confirmPassword}
        class="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 pr-10"
        required
        on:copy|preventDefault
        on:paste|preventDefault
        on:cut|preventDefault
      />
      <button
        type="button"
        class="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
        on:click={() => (showConfirmPassword = !showConfirmPassword)}
      >
        {#if showConfirmPassword}
          👁️
        {:else}
          👁️‍🗨️
        {/if}
      </button>
      {#if errors.confirmPassword}
        <p class="text-red-500 text-sm">{errors.confirmPassword}</p>
      {/if}
    </div>
  {/if}

  <div class="text-center mt-4">
    <button
      type="submit"
      class="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-400"
      class:invisible={buttonText === ''}
    >
      {buttonText}
    </button>
  </div>
</form>
