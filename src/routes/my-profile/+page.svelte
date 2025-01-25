<script>
  import ClientDashboard from '$lib/components/ClientDashboard.svelte';
  import TherapistDashboard from '$lib/components/TherapistDashboard.svelte';

  export let data;
  const user = data.user;
  const roleData = data.roleData;
</script>

{#if user.role === 'therapist'}
  <TherapistDashboard {user} userData={roleData} />
{:else}
  <ClientDashboard />
{/if}
