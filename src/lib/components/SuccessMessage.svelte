<script>
  import { resendVerificationEmail } from '../../utils/resendVerification';
  export let role;
  export let email;

  let statusMessage = '';
  let isError = false;

  const resendEmail = async () => {
    const { message, error } = await resendVerification(email);

    statusMessage = message || error;
    isError = !!error;
  };
</script>

<div class="text-center">
  <div class="text-6xl text-orange-500 mb-6 animate-bounce">🎉</div>
  <h1 class="text-3xl font-bold text-gray-800 mb-4">
    Danke für deine Anmeldung!
  </h1>
  <p class="text-lg text-gray-600">
    Eine Bestätigungs-E-Mail wurde an deine Adresse gesendet. Es kann einige
    Minuten dauern, bis sie ankommt. Bitte prüfe auch deinen Spam-Ordner. Falls
    du die E-Mail nicht erhalten hast, kannst du sie erneut anfordern.
  </p>
  {#if statusMessage}
    <div
      class={`mt-4 p-4 rounded ${isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
    >
      {statusMessage}
    </div>
  {/if}
  <button
    on:click={resendEmail}
    class="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
  >
    Bestätigungs-E-Mail erneut senden
  </button>
  {#if role === 'therapist'}
    <br />
    <p class="text-lg text-gray-600 mt-4">
      Sobald du die E-Mail verifiziert hast, werden wir dein Profil überprüfen
      und uns in Kürze bei dir melden.
    </p>
  {/if}
</div>
