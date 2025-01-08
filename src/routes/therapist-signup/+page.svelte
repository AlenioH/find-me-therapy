<script>
  import LoginInfoForm from '$lib/components/LoginInfoForm.svelte';

  let currentStep = 1;

  // @ts-ignore
  let formComponent;

  let userInfo = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    bio: '',
    address: '',
    languages: [],
    profilePicture: '',
    qualificationsPdf: '',
  };

  const nextStep = () => {
    if (currentStep === 1) {
      // @ts-ignore
      const isValid = formComponent.triggerValidation();
      currentStep = isValid ? 2 : 1;
    } else {
      currentStep = currentStep < 3 ? currentStep + 1 : currentStep;
    }
  };

  const prevStep = () => {
    currentStep = currentStep > 1 ? currentStep - 1 : currentStep;
  };

  const handleSubmit = () => {
    console.log('User info:', userInfo);
    // dispatch('formSubmitted', userInfo); // Dispatch the submitted data to parent component
  };
</script>

<section class="container mx-auto py-12 px-4">
  <div class="text-center">
    {#if currentStep === 1}
      <h3 class="text-2xl font-bold">Schritt 1: Login Information</h3>
      <LoginInfoForm
        bind:this={formComponent}
        handleSubmit={nextStep}
        {userInfo}
      />
    {/if}

    {#if currentStep === 2}
      <h3 class="text-2xl font-bold">Schritt 2: Mehr Information</h3>
      <form>
        <select bind:value={userInfo.gender} class="border p-2 mt-4">
          <option value="">Geschlecht auswählen</option>
          <option value="male">männlich</option>
          <option value="female">weiblich</option>
          <option value="non-binary">non-binary</option>
          <option value="prefer-not-to-say">will nicht sagen</option>
        </select>
        <textarea
          placeholder="Bio"
          bind:value={userInfo.bio}
          class="border p-2 mt-4"
        ></textarea>
        <input
          type="text"
          placeholder="Address"
          bind:value={userInfo.address}
          class="border p-2 mt-4"
          required
        />
      </form>
    {/if}

    {#if currentStep === 3}
      <h3 class="text-2xl font-bold">Schritt 3: Upload Files</h3>
      <form>
        <input
          type="file"
          bind:this={fileInput}
          class="border p-2 mt-4"
          accept="image/*"
        />
        <input
          type="file"
          bind:this={fileInput}
          class="border p-2 mt-4"
          accept=".pdf"
        />
      </form>
    {/if}

    <div class="mt-8">
      {#if currentStep > 1}
        <button
          on:click={prevStep}
          class="bg-gray-300 text-black py-2 px-6 rounded hover:bg-gray-200"
        >
          Zurück
        </button>
      {/if}

      {#if currentStep < 3}
        <button
          on:click={nextStep}
          class="bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-400"
        >
          Weiter
        </button>
      {/if}

      {#if currentStep === 3}
        <button
          on:click={handleSubmit}
          class="bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-400"
        >
          Absenden
        </button>
      {/if}
    </div>
  </div>
</section>
