<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { onClickOutside } from '../../utils/onClickOutside';
  import LoginInfoForm from '$lib/components/LoginInfoForm.svelte';
  import Dropdown from '$lib/components/Dropdown.svelte';
  import bcrypt from 'bcryptjs';

  export let data;
  const specializations = Object.keys(data.specializations);

  const saltRounds = 10; // for bcrypt
  let currentStep = 1;
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

  const dropdownHandleChange = (value, type) => {
    if (type === 'languages') {
      selectedLanguages = value;
    }

    if (type === 'specializations') {
      selectedSpecializations = value;
    }

    if (type === 'gender') {
      userInfo.gender = value;
    }
  };

  let formErrors = {}; // for errors in custom dropdown
  const nextStep = async (e) => {
    e.preventDefault();
    //validate form inputs
    if (form && !form.reportValidity()) {
      return;
    }
    if (currentStep === 1) {
      const isValid = formComponent.triggerValidation();
      currentStep = isValid ? 2 : 1;
    } else if (currentStep === 2) {
      if (!userInfo.gender) {
        formErrors.gender = 1;
      } else {
        delete formErrors.gender;
      }
      if (!selectedLanguages.length) {
        formErrors.languages = 1;
      } else {
        delete formErrors.languages;
      }
      currentStep = Object.keys(formErrors).length ? 2 : 3;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = { ...formErrors };
    if (!selectedSpecializations.length) {
      newErrors.specializations = 1;
      formErrors = { ...newErrors };
      return;
    } else {
      delete newErrors.specializations;
      formErrors = { ...newErrors };
    }
    if (form && !form.reportValidity()) {
      return;
    }

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
  <div class="w-full max-w-lg">
    <p class="text-sm text-gray-500 mb-6">* Felder sind erforderlich</p>

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
        <div class="mb-4">
          <label for="gender" class="block text-sm font-medium text-gray-700">
            Geschlecht *
          </label>
          <Dropdown
            id="gender"
            onChange={dropdownHandleChange}
            selected={userInfo.gender}
            placeholder="Geschlecht auswählen"
            type="gender"
            options={['männlich', 'weiblich', 'nicht-binär']}
            {formErrors}
          />
        </div>

        <div class="mb-4">
          <label for="bio" class="block text-sm font-medium text-gray-700">
            Bio *
          </label>
          <textarea
            id="bio"
            placeholder="Bio"
            bind:value={userInfo.bio}
            class="border w-full p-2 mt-1 rounded-md focus:ring-2 focus:ring-orange-500"
            required
          ></textarea>
        </div>

        <div class="mb-4">
          <label
            for="languages"
            class="block text-sm font-medium text-gray-700"
          >
            Sprachen *
          </label>
          <Dropdown
            id="languages"
            onChange={dropdownHandleChange}
            options={[...topLanguages, ...languages]}
            selected={selectedLanguages}
            placeholder="Sprachen auswählen"
            multiSelect={true}
            type="languages"
            {formErrors}
          />
        </div>

        <div class="mb-4">
          <label for="address" class="block text-sm font-medium text-gray-700">
            Adresse *
          </label>
          <input
            type="text"
            id="address"
            autocomplete="street-address"
            placeholder="Adresse"
            bind:value={userInfo.address}
            class="border w-full p-2 mt-1 rounded-md focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div class="mb-4">
          <label
            for="birthdate"
            class="block text-sm font-medium text-gray-700"
          >
            Geburtsdatum *
          </label>
          <input
            type="date"
            id="birthdate"
            bind:value={userInfo.birthdate}
            class="border w-full p-2 mt-1 rounded-md focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
      </form>
    {/if}

    {#if currentStep === 3}
      <h3 class="text-2xl font-bold mb-6">Schritt 3: Therapie Information</h3>
      <form
        bind:this={form}
        class="border border-gray-300 p-6 rounded-lg shadow-sm bg-white"
      >
        <div class="mb-4">
          <label
            for="specializations"
            class="block text-sm font-medium text-gray-700"
          >
            Spezialisierungen *
          </label>
          <Dropdown
            id="specializations"
            onChange={dropdownHandleChange}
            options={specializations}
            selected={selectedSpecializations}
            placeholder="Spezialisierungen auswählen"
            multiSelect={true}
            type="specializations"
            {formErrors}
          />
        </div>

        <div class="mb-4">
          <label
            for="costPerSession"
            class="block text-sm font-medium text-gray-700"
          >
            Kosten pro Sitzung (€) *
          </label>
          <input
            type="number"
            id="costPerSession"
            placeholder="Kosten pro Sitzung (€)"
            bind:value={userInfo.costPerSession}
            class="border w-full p-2 mt-1 rounded-md focus:ring-2 focus:ring-orange-500"
            required
            step="0.01"
          />
        </div>

        <div class="mb-4">
          <label
            for="sessionDuration"
            class="block text-sm font-medium text-gray-700"
          >
            Dauer der Sitzung (Minuten) *
          </label>
          <input
            type="number"
            id="sessionDuration"
            placeholder="Dauer der Sitzung (Minuten)"
            bind:value={userInfo.sessionDuration}
            class="border w-full p-2 mt-1 rounded-md focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              bind:checked={userInfo.offersFirstConsultation}
              class="mr-2"
            />
            Bietet eine erste Beratung kostenlos an
          </label>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              bind:checked={userInfo.lgbtqFriendly}
              class="mr-2"
            />
            LGBTQ+ freundlich
          </label>
        </div>

        <div class="mb-4">
          <label
            for="profilePicture"
            class="block text-sm font-medium text-gray-700"
          >
            Profilbild hochladen
          </label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            on:change={(e) => (userInfo.profilePicture = e.target.files[0])}
            class="border w-full p-2 mt-1 rounded-md"
          />
          {#if userInfo.profilePicture}
            <img
              src={URL.createObjectURL(userInfo.profilePicture)}
              alt="Profilbild Vorschau"
              class="w-32 h-32 mt-4 rounded-full"
            />
          {/if}
        </div>

        <div class="mb-4">
          <label
            for="profileVideo"
            class="block text-sm font-medium text-gray-700"
          >
            Profilvideo hochladen
          </label>
          <input
            type="file"
            id="profileVideo"
            accept="video/*"
            on:change={(e) => (userInfo.profileVideo = e.target.files[0])}
            class="border w-full p-2 mt-1 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label
            for="qualificationsPdf"
            class="block text-sm font-medium text-gray-700"
          >
            Qualifikationen (PDF) *
          </label>
          <input
            type="file"
            id="qualificationsPdf"
            accept=".pdf"
            on:change={(e) => (userInfo.qualificationsPdf = e.target.files[0])}
            class="border w-full p-2 mt-1 rounded-md"
            required
          />
          {#if userInfo.qualificationsPdf}
            <p class="mt-2 text-sm text-gray-500">
              Hochgeladene Datei: {userInfo.qualificationsPdf.name}
            </p>
          {/if}
        </div>
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
          type="submit"
          on:click={handleSubmit}
          class="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-400 ml-4"
        >
          Absenden
        </button>
      {/if}
    </div>
  </div>
</section>
