<script>
  import LoginModal from '$lib/components/LoginModal.svelte';
  import Layout from '../+layout.svelte';
  import { activeModal } from '$lib/stores';

  export let data;

  const openLoginModal = () => {
    activeModal.set('login');
  };
</script>

<section
  class="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto text-center mt-5"
>
  <h1 class="text-2xl font-bold text-gray-800 mb-4">{data.message}</h1>

  {#if data.message.includes('erfolgreich')}
    <button
      class="mt-4 bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-400"
      on:click={openLoginModal}
    >
      Jetzt Anmelden
    </button>
  {/if}
</section>
