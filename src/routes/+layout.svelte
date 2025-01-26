<script>
  import '../app.css';
  import { goto } from '$app/navigation';
  import { writable } from 'svelte/store';
  import { fly } from 'svelte/transition';
  import { updateUser, user as userStore } from '$lib/stores';
  import Modal from '$lib/components/LoginModal.svelte';
  import { page } from '$app/state';

  export let data;

  const defaultUser = {
    id: null,
    name: '',
    email: '',
    role: '',
    roleData: null,
    adminApproval: null,
    appointments: null,
  };
  // USER FROM JWT TOKEN
  const user = data.user || defaultUser;

  // store to control the visibility of the modals
  const showLoginModal = writable(false);

  async function logout() {
    const response = await fetch('/api/logout', {
      method: 'POST',
    });

    if (response.ok) {
      updateUser({
        id: null,
        name: '',
        email: '',
        role: '',
        roleData: null,
        adminApproval: null,
        appointments: null,
      });
      goto('/'); // Redirect to the home page or login page
    } else {
      console.error('Failed to logout');
    }
  }

  $: userStore.set(user);
  // functions to open and close the modals
  const openLoginModal = () => showLoginModal.set(true);
  const closeLoginModal = () => showLoginModal.set(false);
</script>

<div class="flex flex-col min-h-screen">
  <header class="bg-yellow-500 text-white py-4 shadow-lg">
    <div class="container mx-auto flex justify-between items-center px-4">
      <h1 class="text-2xl font-bold">FindMeTherapy</h1>
      <nav>
        <ul class="flex space-x-4">
          <li><a href="/" class="hover:underline">Home</a></li>
          <li><a href="/about" class="hover:underline">About</a></li>
          <li><a href="/contact" class="hover:underline">Contact</a></li>
        </ul>
      </nav>
      <div class="flex space-x-4">
        {#if !$userStore.id}
          <a
            class="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-400"
            href="/client-signup"
          >
            Registrieren (Kunde)
          </a>
          <button
            class="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-400"
            on:click={openLoginModal}
          >
            Anmelden als Kunde
          </button>
          <button
            class="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-400"
            on:click={openLoginModal}
          >
            Anmelden als Therapeut:in
          </button>
        {:else}
          <a
            class="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-400"
            href="/my-profile"
          >
            Mein Profil
          </a>
          <button
            class="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-400"
            on:click={logout}
          >
            Ausloggen
          </button>
        {/if}
      </div>
    </div>
  </header>

  <main class="flex-grow overflow-hidden">
    {#key page.url.pathname}
      <div in:fly={{ y: 10, duration: 200 }} out:fly={{ y: -10, duration: 200 }}>
        <slot />
      </div>
    {/key}
  </main>

  <footer class="bg-yellow-500 text-white text-center py-4">
    <p>&copy; 2025 FindMeTherapy. All rights reserved.</p>
  </footer>

  <Modal
    showModal={$showLoginModal}
    closeModal={closeLoginModal}
    title="Anmelden"
  />
</div>
