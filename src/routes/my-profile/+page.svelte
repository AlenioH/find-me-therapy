<script>
  export let data;

  let user = data.user;
</script>

{#if user}
  <h1>Welcome, {user.role}!</h1>
  {#if user.role === 'therapist'}
    WELCOME THERAPIST CHAMPION
    <p>You are a therapist, welcome to your dashboard.</p>
  {:else if user.role === 'client'}
    <p>You are a client, here's your appointment history.</p>
  {/if}
{:else}
  <p>You are not authenticated. Please log in.</p>
{/if}
