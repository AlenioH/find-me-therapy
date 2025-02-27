<script>
  import { page } from '$app/stores';
  import { filters, queryToFilters, dropdownHandleChange } from '$lib/filters';
  import { onMount } from 'svelte';
  import Dropdown from '$lib/components/Dropdown.svelte';

  export let data;

  const therapists = data.therapists;

  $: filters.set(queryToFilters($page.url.searchParams.toString()));

  let specializationOptions = data.specializations;
  let languageOptions = [];

  const topLanguages = [
    'Deutsch',
    'Englisch',
    'Türkisch',
    'Serbisch',
    'Arabisch',
    'Ungarisch',
  ];

  const performSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams({
      location,
      offersFirstConsultation: offersFirstConsultation ? 'true' : 'false',
      gender: gender.join(','),
      ageRange: ageRange.join('-'),
      priceRange: priceRange.join('-'),
      languages: languages.join(','),
      specializations: specializations.join(','),
      lgbtqFriendly: lgbtqFriendly ? 'true' : 'false',
    });

    goto(`/search-results?${params.toString()}`);
  };

  // Function to generate a dummy "next possible appointment" date (e.g., next week)
  const getNextAppointment = () => {
    const now = new Date();
    now.setDate(now.getDate() + 7);
    return now.toLocaleString('de-DE');
  };
  const calculateAge = (birthdate) => {
    if (!birthdate) return 'N/A';
    const birthYear = new Date(birthdate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  onMount(async () => {
    const resLanguages = await fetch('/api/languages');
    languageOptions = await resLanguages.json();
  });
</script>

<div class="flex">
  <div class="w-64 bg-orange-100 p-6 hidden lg:block">
    <h3 class="text-xl font-bold text-orange-600 mb-4">Filter</h3>
    <div class="mb-4">
      <label for="location" class="block font-medium text-gray-700"
        >PLZ/Ort:</label
      >
      <input
        id="location"
        type="text"
        bind:value={$filters.location}
        class="w-full max-w-[200px] border-2 border-gray-300 p-2 rounded-md focus:ring focus:ring-orange-500"
      />
    </div>
    <fieldset class="mb-4">
      <legend class="font-medium text-gray-700">Preis pro Sitzung (€)</legend>
      <div class="flex items-center gap-2">
        <label for="priceFrom" class="sr-only">Preis von</label>
        <input
          id="priceFrom"
          type="number"
          min="30"
          max="200"
          step="5"
          bind:value={$filters.priceRange[0]}
          class="w-full border-2 border-gray-300 p-2 rounded-md focus:ring focus:ring-orange-500"
          placeholder="Von"
        />
        <span class="text-gray-600">-</span>
        <label for="priceTo" class="sr-only">Preis bis</label>
        <input
          id="priceTo"
          type="number"
          min="30"
          max="200"
          step="5"
          bind:value={$filters.priceRange[1]}
          class="w-full border-2 border-gray-300 p-2 rounded-md focus:ring focus:ring-orange-500"
          placeholder="Bis"
        />
      </div>
    </fieldset>
    <div class="flex items-center mb-4">
      <input
        id="offersFirstConsultation"
        type="checkbox"
        bind:checked={$filters.offersFirstConsultation}
        class="mr-2"
      />
      <label for="offersFirstConsultation" class="font-medium text-gray-700"
        >Kostenlose Erstberatung</label
      >
    </div>
    <div class="mb-4">
      <div>
        <label for="gender" class="text-lg font-semibold text-gray-700"
          >Geschlecht</label
        >
        <Dropdown
          id="gender"
          onChange={dropdownHandleChange}
          selected={$filters.gender}
          placeholder="Geschlecht auswählen"
          multiSelect={true}
          type="gender"
          options={['männlich', 'weiblich', 'nicht-binär']}
        />
      </div>
    </div>

    <fieldset>
      <legend class="font-medium text-gray-700">Altersspanne</legend>
      <div class="flex items-center gap-2">
        <label for="ageFrom" class="sr-only">Alter von</label>
        <input
          id="ageFrom"
          type="number"
          min="18"
          max="80"
          step="1"
          bind:value={$filters.ageRange[0]}
          class="w-full border-2 border-gray-300 p-2 rounded-md focus:ring focus:ring-orange-500"
          placeholder="Von"
        />
        <span class="text-gray-600">-</span>
        <label for="ageTo" class="sr-only">Alter bis</label>
        <input
          id="ageTo"
          type="number"
          min="18"
          max="80"
          step="1"
          bind:value={$filters.ageRange[1]}
          class="w-full border-2 border-gray-300 p-2 rounded-md focus:ring focus:ring-orange-500"
          placeholder="Bis"
        />
      </div>
    </fieldset>

    <div class="mb-4">
      <label for="languages" class="text-lg font-semibold text-gray-700"
        >Sprachen</label
      >
      <Dropdown
        id="languages"
        onChange={dropdownHandleChange}
        options={[...topLanguages, ...languageOptions]}
        selected={$filters.languages}
        placeholder="Sprachen auswählen"
        multiSelect={true}
        type="languages"
      />
    </div>

    <div class="flex items-center mb-4">
      <input
        id="lgbtqFriendly"
        type="checkbox"
        bind:checked={$filters.lgbtqFriendly}
        class="mr-2"
      />
      <label for="lgbtqFriendly" class="font-medium text-gray-700"
        >LGBTQ+ freundlich</label
      >
    </div>
    <div class="mb-4">
      <label for="specializations" class="text-lg font-semibold text-gray-700"
        >Schwerpunkt</label
      >
      <Dropdown
        id="specializations"
        onChange={dropdownHandleChange}
        options={Object.keys(specializationOptions)}
        selected={$filters.specializations}
        placeholder="Schwerpunkt auswählen"
        multiSelect={true}
        type="specializations"
      />
    </div>

    <button
      on:click={performSearch}
      class="bg-yellow-500 text-black font-bold py-2 px-4 rounded-full hover:bg-yellow-400 transition-colors w-full"
    >
      Filter anwenden
    </button>
  </div>
  <section class="flex-1 p-4">
    <h2 class="text-3xl font-bold mb-6 text-center text-orange-600">
      Suchergebnisse für Therapeuten
    </h2>

    {#if therapists?.length === 0}
      <p class="text-center text-gray-500">
        Es wurden keine Therapeuten gefunden, die Ihrer Suche entsprechen.
      </p>
    {:else}
      <div class="grid grid-cols-1 gap-6">
        {#each therapists as therapist}
          <div
            class="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:shadow-xl"
          >
            <div class="relative">
              <img
                src={therapist.profilePicture ||
                  'https://via.placeholder.com/150'}
                alt="Therapist Profile"
                class="w-full h-48 object-cover"
              />
              <div
                class="absolute top-0 left-0 bg-black bg-opacity-50 text-white text-lg p-2"
              >
                {therapist.gender === 'maennlich'
                  ? 'Herr'
                  : therapist.gender === 'weiblich'
                    ? 'Frau'
                    : 'Therapeut'}
                {therapist.user.name}
              </div>
            </div>

            <div class="p-4">
              <h3 class="text-xl font-semibold text-lavender-700">
                {therapist.user.name}, {calculateAge(therapist.birthdate)} Jahre
              </h3>
              <p class="text-gray-600">{therapist.city}</p>

              <p class="text-gray-600 mt-2">
                {therapist.specialization.join(', ').replaceAll('_', ' ')}
              </p>
              <p class="text-gray-500 mt-2">{therapist.bio}</p>

              <div
                class="mt-4 flex justify-between items-center text-sm text-gray-500"
              >
                <span>{therapist.languages.join(', ')}</span>
                <span>{therapist.sessionDuration} min Sitzung</span>
              </div>

              <div class="mt-4 text-sm text-gray-500">
                <span
                  >{therapist.lgbtqFriendly
                    ? 'LGBTQ+ Freundlich'
                    : 'Nicht LGBTQ+ Freundlich'}</span
                >
              </div>

              <div class="mt-4 text-sm text-gray-700">
                <p>
                  <strong>Preis:</strong> €{therapist.costPerSession} pro Sitzung
                </p>
                {#if therapist.offersFirstConsultation}
                  <p class="text-green-600 font-semibold">
                    ✅ Kostenlose Erstberatung verfügbar
                  </p>
                {/if}
              </div>

              <div class="mt-4 text-sm text-gray-500">
                Nächster verfügbarer Termin: {getNextAppointment()}
              </div>

              <div class="mt-4 text-sm text-gray-700">
                <p><strong>Adresse:</strong> {therapist.address}</p>
              </div>

              <div
                class="mt-4 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0"
              >
                <a
                  href={`/therapist/${therapist.id}`}
                  class="bg-orange-500 text-white font-bold py-2 px-4 rounded-full hover:bg-orange-400 transition-colors w-full sm:w-auto"
                >
                  Profil besuchen
                </a>
                <button
                  class="bg-yellow-500 text-black font-bold py-2 px-4 rounded-full hover:bg-yellow-400 transition-colors w-full sm:w-auto"
                >
                  Buchen
                </button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </section>
</div>

<style>
  .text-lavender-700 {
    color: #8a4fff;
  }

  .lg\:block {
    display: block;
  }

  .flex {
    display: flex;
  }
  .flex-1 {
    flex: 1;
  }

  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    .lg\:block {
      display: block;
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1.5rem;
  }
</style>
