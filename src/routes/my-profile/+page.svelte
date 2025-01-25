<script>
  import { onMount } from 'svelte';
  import ClientDashboard from '$lib/components/ClientDashboard.svelte';
  import TherapistDashboard from '$lib/components/TherapistDashboard.svelte';
  import { user as userStore, updateUser } from '$lib/stores';

  export let data;
  const user = data.user;

  //hydrate the store on page load
  onMount(() => {
    if (user) {
      updateUser(user);
    }
  });
</script>

{#if $userStore.role === 'therapist'}
  <TherapistDashboard user={{ ...$userStore }} />
{:else}
  <ClientDashboard />
{/if}
