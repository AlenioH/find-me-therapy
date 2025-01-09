<script>
  import bcrypt from 'bcryptjs';
  import LoginInfoForm from '$lib/components/LoginInfoForm.svelte';

  const saltRounds = 10; //for bcrypt
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

  const nextStep = async (e) => {
    e.preventDefault();
    console.log('user', userInfo);
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

  const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  };

  const handleSubmit = async () => {
    userInfo.password = await hashPassword(userInfo.password);
    console.log('User info:', userInfo);
  };
</script>

<section class="container mx-auto py-12 px-4 flex justify-center">
  <div class="text-center w-full max-w-lg">
    {#if currentStep === 1}
      <h3 class="text-2xl font-bold mb-6">Schritt 1: Login Information</h3>
      <div class="border border-gray-300 p-6 rounded-lg shadow-sm bg-white">
        <LoginInfoForm
          bind:this={formComponent}
          handleSubmit={nextStep}
          {userInfo}
        />
      </div>
    {/if}

    {#if currentStep === 2}
      <h3 class="text-2xl font-bold mb-6">Schritt 2: Mehr Information</h3>
      <form class="border border-gray-300 p-6 rounded-lg shadow-sm bg-white">
        <select
          bind:value={userInfo.gender}
          required
          class="border w-full p-2 mt-4 rounded-md"
        >
          <option value="">Geschlecht auswählen</option>
          <option value="male">männlich</option>
          <option value="female">weiblich</option>
          <option value="non-binary">non-binary</option>
          <option value="prefer-not-to-say">will nicht sagen</option>
        </select>
        <textarea
          placeholder="Bio"
          bind:value={userInfo.bio}
          class="border w-full p-2 mt-4 rounded-md"
        ></textarea>
        <input
          type="text"
          placeholder="Address"
          bind:value={userInfo.address}
          class="border w-full p-2 mt-4 rounded-md"
          required
        />
      </form>
    {/if}

    {#if currentStep === 3}
      <h3 class="text-2xl font-bold mb-6">Schritt 3: Upload Files</h3>
      <form class="border border-gray-300 p-6 rounded-lg shadow-sm bg-white">
        <input
          type="file"
          class="border w-full p-2 mt-4 rounded-md"
          accept="image/*"
        />
        <input
          type="file"
          class="border w-full p-2 mt-4 rounded-md"
          accept=".pdf"
        />
      </form>
    {/if}

    <div class="mt-8">
      {#if currentStep > 1}
        <button
          on:click={prevStep}
          class="bg-gray-300 text-black py-2 px-6 rounded-lg hover:bg-gray-200"
        >
          Zurück
        </button>
      {/if}

      {#if currentStep < 3}
        <button
          on:click={nextStep}
          class="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-400 ml-4"
        >
          Weiter
        </button>
      {/if}

      {#if currentStep === 3}
        <button
          on:click={handleSubmit}
          class="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-400 ml-4"
        >
          Absenden
        </button>
      {/if}
    </div>
  </div>
</section>
