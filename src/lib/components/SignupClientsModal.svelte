<script>
  import bcrypt from 'bcryptjs';

  export let showModal = false;
  export let closeModal = () => {};
  export let title = 'Modal Title';

  const saltRounds = 10; //for bcrypt

  let email = '';
  let password = '';
  let confirmPassword = '';
  let name = '';

  let errors = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  };

  // close modal when clicking outside the modal
  const handleClose = () => {
    clearForm();
    closeModal();
  };

  const clearForm = () => {
    email = '';
    password = '';
    confirmPassword = '';
    name = '';
  };

  const handleOutsideClick = (event) => {
    const modalContent = event.target.closest('.modal-content');
    if (!modalContent) {
      clearForm();
      closeModal();
    }
  };

  const hashPassword =  async (password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

 const validate = () => {
    errors = {
      email: validateEmail(email) ? '' : 'Invalid email format',
      password: validatePassword(password)
        ? ''
        : 'Password must be at least 8 characters long and contain 1 uppercase, 1 lowercase, and 1 special character',
      confirmPassword:
        password === confirmPassword ? '' : 'Passwords do not match',
      name: name.trim() ? '' : 'Name is required',
    };
    return Object.values(errors).every((error) => error === ''); // Form is valid if there are no errors
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  const validatePassword = (password) => {
    // password must be at least 8 characters long, with at least 1 uppercase letter, 1 lowercase letter, and 1 special character
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return re.test(password);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validate()) {
      const hashedPassword = await hashPassword(password);
      const response = await fetch('/api/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password: hashedPassword,
          name,
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
  }
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

      <form id="registration-form" on:submit={handleSubmit}>
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
          {#if errors.name}
            <p class="text-red-500 text-sm">{errors.name}</p>
          {/if}
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
          {#if errors.email}
            <p class="text-red-500 text-sm">{errors.email}</p>
          {/if}
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
          {#if errors.password}
            <p class="text-red-500 text-sm">{errors.password}</p>
          {/if}
        </div>

        <div class="mb-4">
          <label
            for="confirmPassword"
            class="block text-sm font-medium text-gray-700"
            >Confirm Password</label
          >
          <input
            type="password"
            id="confirmPassword"
            bind:value={confirmPassword}
            class="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            required
          />
          {#if errors.confirmPassword}
            <p class="text-red-500 text-sm">{errors.confirmPassword}</p>
          {/if}
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
