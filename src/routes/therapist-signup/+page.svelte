<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { onClickOutside } from '../../utils/onClickOutside';
  import LoginInfoForm from '$lib/components/LoginInfoForm.svelte';
  import bcrypt from 'bcryptjs';

  export let data;
  const specializations = Object.keys(data.specializations);

  const saltRounds = 10; // for bcrypt
  let currentStep = 1;
  let activeDropdown = null;
  let selectedLanguages = [];
  let selectedSpecializations = [];
  const topLanguages = [
    'Deutsch',
    'Englisch',
    'Türkisch',
    'Serbisch',
    'Arabisch',
    'Ungarisch',
  ];

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

  $: languages = [];

  const toggleDropdown = (name) => {
    activeDropdown = activeDropdown === name ? null : name;
  };

  const multiSelectHandleChange = (item, type) => {
    if (type === 'languages') {
      selectedLanguages = selectedLanguages.includes(item)
        ? selectedLanguages.filter((lang) => lang !== item)
        : [...selectedLanguages, item];
    } else {
      selectedSpecializations = selectedSpecializations.includes(item)
        ? selectedSpecializations.filter((spec) => spec !== item)
        : [...selectedSpecializations, item];
    }
  };

  const isDropdownOpen = (name) => activeDropdown === name;

  const nextStep = async (e) => {
    e.preventDefault();
    //validate form inputs
    if (form && !form.reportValidity()) {
      return;
    }
    if (currentStep === 1) {
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
    const hashedPassword = await hashPassword(userInfo.password);

    const formData = new FormData();

    formData.append('name', userInfo.name);
    formData.append('role', 'therapist');
    formData.append('email', userInfo.email);
    formData.append('password', hashedPassword);
    formData.append('gender', userInfo.gender);
    formData.append('bio', userInfo.bio);
    formData.append('address', userInfo.address);
    formData.append('languages', JSON.stringify(selectedLanguages)); // Convert array to string
    formData.append('specialization', JSON.stringify(selectedSpecializations));
    formData.append('costPerSession', userInfo.costPerSession);
    formData.append('sessionDuration', userInfo.sessionDuration);
    formData.append(
      'offersFirstConsultation',
      userInfo.offersFirstConsultation
    );
    formData.append('lgbtqFriendly', userInfo.lgbtqFriendly);
    formData.append('birthdate', new Date(userInfo.birthdate).toISOString());
    formData.append('qualificationsPdf', userInfo.qualificationsPdf);

    if (userInfo.profilePicture) {
      formData.append('profilePicture', userInfo.profilePicture);
    }
    if (userInfo.profileVideo) {
      formData.append('profileVideo', userInfo.profileVideo);
    }

    const response = await fetch('/api/create-user', {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      alert('User created successfully');
      goto('/signup-success', { replaceState: true });
    } else {
      alert('Failed to create user');
    }
  };

  onMount(async () => {
    const res = await fetch('/api/languages');
    languages = await res.json();
  });
</script>

<section class="container mx-auto py-12 px-4 flex justify-center">
  <div class="text-center w-full max-w-lg">
    {#if currentStep === 1}
      <h3 class="text-2xl font-bold mb-6">Schritt 1: Login Information</h3>
      <div class="border border-gray-300 p-6 rounded-lg shadow-sm bg-white">
        <LoginInfoForm
          formType="register"
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
        <div class="relative w-full max-w-md">
          <button
            id="languages-dropdown-button"
            on:click={() => toggleDropdown('languages')}
            class="w-full px-4 py-2 text-left bg-white border rounded-lg shadow-md flex justify-between items-center"
          >
            {#if selectedLanguages.length === 0}
              <span class="text-gray-400">Sprachen auswählen</span>
            {:else}
              <span>{selectedLanguages.join(', ')}</span>
            {/if}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-gray-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <input
            type="hidden"
            name="languages"
            value={JSON.stringify(selectedLanguages)}
            required
          />
          {#if isDropdownOpen('languages')}
            <div
              class="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto"
              use:onClickOutside={{
                callback: () => (activeDropdown = null),
                excludeSelector: '#languages-dropdown-button',
              }}
            >
              {#each topLanguages as language}
                <label
                  class="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                  aria-checked={selectedLanguages.includes(language)}
                >
                  <input
                    type="checkbox"
                    class="mr-2"
                    checked={selectedLanguages.includes(language)}
                    on:change={() => multiSelectHandleChange(language, 'languages')}
                  />
                  <span>{language}</span>
                </label>
              {/each}
              <hr />
              {#each languages as language}
                <label
                  class="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                  aria-checked={selectedLanguages.includes(language)}
                >
                  <input
                    type="checkbox"
                    class="mr-2"
                    checked={selectedLanguages.includes(language)}
                    on:change={() => multiSelectHandleChange(language)}
                  />
                  <span>{language}</span>
                </label>
              {/each}
            </div>
          {/if}
        </div>
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
      </form>
    {/if}

    {#if currentStep === 3}
      <h3 class="text-2xl font-bold mb-6">Schritt 3: Therapie Information</h3>
      <form
        bind:this={form}
        class="border border-gray-300 p-6 rounded-lg shadow-sm bg-white"
      >
        <div class="relative w-full max-w-md">
          <button
            id="specializations-dropdown-button"
            on:click={() => toggleDropdown('specializations')}
            class="w-full px-4 py-2 text-left bg-white border rounded-lg shadow-md flex justify-between items-center"
          >
            {#if selectedSpecializations.length === 0}
              <span class="text-gray-400"> Specializierung auswählen</span>
            {:else}
              <span>{selectedSpecializations.join(', ').replaceAll('_', ' ')}</span>
            {/if}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-gray-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <input
            type="hidden"
            name="specializations"
            value={JSON.stringify(selectedSpecializations)}
            required
          />
          {#if isDropdownOpen('specializations')}
            <div
              class="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto"
              use:onClickOutside={{
                callback: () => (activeDropdown = null),
                excludeSelector: '#specializations-dropdown-button',
              }}
            >
              {#each specializations as specialization}
                <label
                  class="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                  aria-checked={selectedSpecializations.includes(
                    specialization
                  )}
                >
                  <input
                    type="checkbox"
                    class="mr-2"
                    checked={selectedSpecializations.includes(specialization)}
                    on:change={() => multiSelectHandleChange(specialization, )}
                  />
                  <span>{specialization.replace('_', ' ')}</span>
                </label>
              {/each}
            </div>
          {/if}
        </div>
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
        <label class="block mt-4">
          <input
            type="file"
            accept="image/*"
            placeholder="Profilbild hochladen"
            on:change={(e) => (userInfo.profilePicture = e.target.files[0])}
            class="border w-full p-2 mt-4 rounded-md"
          />
          Profilbild hochladen
        </label>
        {#if userInfo.profilePicture}
          <img
            src={URL.createObjectURL(userInfo.profilePicture)}
            alt="Profilbild Vorschau"
            class="w-32 h-32 mt-4 rounded-full"
          />
        {/if}
        <label>
          <input
            type="file"
            accept="video/*"
            placeholder="Profilvideo hochladen"
            on:change={(e) => (userInfo.profileVideo = e.target.files[0])}
            class="border w-full p-2 mt-4 rounded-md"
          />
          Profilvideo hochladen
        </label>
        <label>
          <input
            type="file"
            accept=".pdf"
            placeholder="Qualifikationen (PDF)"
            on:change={(e) => (userInfo.qualificationsPdf = e.target.files[0])}
            class="border w-full p-2 mt-4 rounded-md"
            required
          />
          Qualifikationen
        </label>
        {#if userInfo.qualificationsPdf}
          <p class="mt-2 text-sm text-gray-500">
            Hochgeladene Datei: {userInfo.qualificationsPdf.name}
          </p>
        {/if}
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
