<script>
  import LoginInfoForm from '$lib/components/LoginInfoForm.svelte';
  import bcrypt from 'bcryptjs';

  const saltRounds = 10; // for bcrypt
  let currentStep = 1;

  /**
   * @type {HTMLFormElement}
   */
  let form;
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
    specialization: [],
    costPerSession: '',
    sessionDuration: '',
    offersFirstConsultation: false,
    lgbtqFriendly: false,
    profilePicture: '',
    profileVideo: '',
    qualificationsPdf: '',
    birthdate: '',
  };

  //TODO: enum/API
  const languagesOptions = [
    'English',
    'Spanish',
    'French',
    'German',
    'Chinese',
  ];
  const specializationOptions = [
    'Cognitive Behavioral Therapy',
    'Psychoanalysis',
    'Family Therapy',
    'Trauma Therapy',
    'Mindfulness-Based Therapy',
  ];

  const nextStep = async (e) => {
    e.preventDefault();
    //validate form inputs
    if (form && !form.reportValidity()) {
      return;
    }
    console.log('user', userInfo);
    if (currentStep === 1) {
      // @ts-ignore
      const isValid = formComponent.triggerValidation();
      currentStep = isValid ? 2 : 1;
    } else {
      currentStep = currentStep < 3 ? currentStep + 1 : currentStep;
    }
    currentStep = currentStep < 3 ? currentStep + 1 : currentStep;
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
      <h3 class="text-2xl font-bold mb-6">
        Schritt 2: Persönliche Information
      </h3>
      <form
        bind:this={form}
        class="border border-gray-300 p-6 rounded-lg shadow-sm bg-white"
      >
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
          required
        ></textarea>
        <input
          type="text"
          autocomplete="street-address"
          placeholder="Adresse"
          bind:value={userInfo.address}
          class="border w-full p-2 mt-4 rounded-md"
          required
        />
        <input
          type="date"
          bind:value={userInfo.birthdate}
          class="border w-full p-2 mt-4 rounded-md"
          required
        />
        <select
          bind:value={userInfo.languages}
          multiple
          required
          class="border w-full p-2 mt-4 rounded-md"
        >
          <option value="" disabled>Sprachen auswählen</option>
          {#each languagesOptions as language}
            <option value={language}>{language}</option>
          {/each}
        </select>
      </form>
    {/if}

    {#if currentStep === 3}
      <h3 class="text-2xl font-bold mb-6">Schritt 3: Therapie Information</h3>
      <form
        bind:this={form}
        class="border border-gray-300 p-6 rounded-lg shadow-sm bg-white"
      >
        <select
          bind:value={userInfo.specialization}
          multiple
          required
          class="border w-full p-2 mt-4 rounded-md"
        >
          <option value="" disabled>Spezialisierungen auswählen</option>
          {#each specializationOptions as specialization}
            <option value={specialization}>{specialization}</option>
          {/each}
        </select>
        <input
          type="number"
          placeholder="Kosten pro Sitzung (€)"
          bind:value={userInfo.costPerSession}
          class="border w-full p-2 mt-4 rounded-md"
          required
          step="0.01"
        />
        <input
          type="number"
          placeholder="Dauer der Sitzung (Minuten)"
          bind:value={userInfo.sessionDuration}
          class="border w-full p-2 mt-4 rounded-md"
          required
        />
        <label class="block mt-4">
          <input
            type="checkbox"
            bind:checked={userInfo.offersFirstConsultation}
            class="mr-2"
          />
          Bietet eine erste Beratung kostenlos an
        </label>
        <label class="block mt-4">
          <input
            type="checkbox"
            bind:checked={userInfo.lgbtqFriendly}
            class="mr-2"
          />
          LGBTQ+ freundlich
        </label>
        <input
          type="file"
          accept="image/*"
          placeholder="Profilbild hochladen"
          bind:value={userInfo.profilePicture}
          class="border w-full p-2 mt-4 rounded-md"
        />
        <input
          type="file"
          accept="video/*"
          placeholder="Profilvideo hochladen"
          bind:value={userInfo.profileVideo}
          class="border w-full p-2 mt-4 rounded-md"
        />
        <input
          type="file"
          accept=".pdf"
          placeholder="Qualifikationen (PDF)"
          bind:value={userInfo.qualificationsPdf}
          class="border w-full p-2 mt-4 rounded-md"
          required
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
