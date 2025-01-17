<script>
  import '../app.css';
  import { writable } from 'svelte/store';
  import Modal from '$lib/components/LoginModal.svelte';

  export let data;
  const user = data.user;

  // store to control the visibility of the modals
  const showLoginModal = writable(false);

  // functions to open and close the modals
  const openLoginModal = () => showLoginModal.set(true);
  const closeLoginModal = () => showLoginModal.set(false);
</script>

<div class="flex flex-col min-h-screen">
  <!-- Header -->
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
        {#if !user}
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
            on:click={openLoginModal}
          >
            Ausloggen
          </button>
        {/if}
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex-grow">
    <slot />
  </main>

  <!-- Footer -->
  <footer class="bg-yellow-500 text-white text-center py-4">
    <p>&copy; 2025 FindMeTherapy. All rights reserved.</p>
  </footer>

  <Modal
    showModal={$showLoginModal}
    closeModal={closeLoginModal}
    title="Anmelden"
  />
</div>
