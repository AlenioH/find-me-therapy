<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  // onMount(() => {
  //   // Redirect the user to the homepage after 5 seconds
  //   setTimeout(() => {
  //     goto('/'); // Redirect to the homepage (or change to a desired page)
  //   }, 5000); // 5 seconds delay
  // });
</script>

<div class="flex flex-col justify-center items-center h-screen bg-gray-100 text-center">
  <!-- Animated icon -->
  <div class="text-6xl text-orange-500 mb-6 animate-bounce">
    🎉
  </div>

  <!-- Thank You message -->
  <h1 class="text-3xl font-bold text-gray-800 mb-4 animate-fadeIn">Danke für deine Anmeldung!</h1>

  <!-- Sub message with animation -->
  <p class="text-lg text-gray-600 animate-fadeIn animation-delay-2">
    Wir haben dein Profil erhalten und werden es bald überprüfen.
    <br />
    Wir melden uns in Kürze bei dir.
  </p>
</div>

<style>
  /* Animation for fading in */
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  /* Animation delay for the sub-message */
  .animate-fadeIn {
    animation: fadeIn 1.5s ease-out;
  }

  .animation-delay-2 {
    animation-delay: 2s;
  }
</style>
