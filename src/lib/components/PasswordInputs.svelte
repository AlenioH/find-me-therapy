<script>
  import { activeModal } from '$lib/stores';

  export let password = '';
  export let confirmPassword = '';
  export let formType;
  export let errors;

  let showPassword = false;
  let showConfirmPassword = false;
  let showForgotPassword = false;

  $: if (showPassword) {
    setTimeout(() => (showPassword = false), 5000); // auto-hide after 5 seconds
  }
</script>

<div class="mb-4 relative">
  <label for="password" class="block text-sm font-medium text-gray-700"
    >Password</label
  >
  <input
    type={showPassword ? 'text' : 'password'}
    id="password"
    bind:value={password}
    class="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 pr-10"
    required
    on:copy|preventDefault
    on:paste|preventDefault
    on:cut|preventDefault
  />
  <button
    type="button"
    class="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
    on:click={() => (showPassword = !showPassword)}
  >
    {#if showPassword}
      👁️
    {:else}
      👁️‍🗨️
    {/if}
  </button>
  {#if errors.password}
    <p class="text-red-500 text-sm">{errors.password}</p>
  {/if}
  {#if formType === 'login'}
    <p class="text-sm text-gray-600 mt-2">
      <button
      type="button"
        class="text-blue-500 hover:underline"
        on:click={() => {
          activeModal.set('forgotPassword');
        }}
      >
        Passwort vergessen?
      </button>
    </p>
  {/if}
</div>

{#if formType !== 'login'}
  <div class="mb-4 relative">
    <label for="confirmPassword" class="block text-sm font-medium text-gray-700"
      >Passwort bestätigen</label
    >
    <input
      type={showConfirmPassword ? 'text' : 'password'}
      id="confirmPassword"
      bind:value={confirmPassword}
      class="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 pr-10"
      required
      on:copy|preventDefault
      on:paste|preventDefault
      on:cut|preventDefault
    />
    <button
      type="button"
      class="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
      on:click={() => (showConfirmPassword = !showConfirmPassword)}
    >
      {#if showConfirmPassword}
        👁️
      {:else}
        👁️‍🗨️
      {/if}
    </button>
    {#if errors.confirmPassword}
      <p class="text-red-500 text-sm">{errors.confirmPassword}</p>
    {/if}
  </div>
{/if}
