<script>
  import '../app.css';
  import { writable } from 'svelte/store';
  import Modal from '$lib/components/SignupClientsModal.svelte';

  // store to control the visibility of the modals
  const showRegisterModal = writable(false);
  const showLoginModal = writable(false);

  // functions to open and close the modals
  const openRegisterModal = () => showRegisterModal.set(true);
  const openLoginModal = () => showLoginModal.set(true);
  const closeRegisterModal = () => showRegisterModal.set(false);
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
        <button
          class="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-400"
          on:click={openRegisterModal}
        >
          Registrieren
        </button>
        <button
          class="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-400"
          on:click={openLoginModal}
        >
          Anmelden
        </button>
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

  <!-- Modals -->
  <Modal
    showModal={$showRegisterModal}
    closeModal={closeRegisterModal}
    title="Registrieren"
  />
  <Modal
    showModal={$showLoginModal}
    closeModal={closeLoginModal}
    title="Anmelden"
  />
</div>
