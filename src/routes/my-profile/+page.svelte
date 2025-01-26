<script>
  import { onMount } from 'svelte';
  import ClientDashboard from '$lib/components/ClientDashboard.svelte';
  import TherapistDashboard from '$lib/components/TherapistDashboard.svelte';
  import { user as userStore, updateUser } from '$lib/stores';

  export let data;
  const user = data.user;
  let isLoading = true;

  //hydrate the store on page load
  onMount(() => {
    if (user) {
      updateUser(user);
    }
    isLoading = false;
  });
</script>

{#if isLoading}
  <div class="flex items-center justify-center min-h-screen">
    <div
      class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-yellow-500"
    ></div>
    <span class="ml-4 text-yellow-500">Loading...</span>
  </div>
{:else if $userStore.role === 'therapist'}
  <TherapistDashboard />
{:else}
  <ClientDashboard />
{/if}
