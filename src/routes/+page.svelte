<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Dropdown from '$lib/components/Dropdown.svelte';

  export let data;

  let specializationOptions = data.specializations;
  let languageOptions = [];

  let location = 'Wien';
  let offersFirstConsultation = true;

  let gender = [];
  let ageRange = [18, 80];
  let priceRange = [50, 150];
  let languages = [];
  let specializations = [];
  let lgbtqFriendly = false;

  let showMoreFilters = false;

  const topLanguages = [
    'Deutsch',
    'Englisch',
    'Türkisch',
    'Serbisch',
    'Arabisch',
    'Ungarisch',
  ];

  const dropdownHandleChange = (value, type) => {
    if (type === 'languages') {
      languages = value;
    }

    if (type === 'specializations') {
      specializations = value;
    }

    if (type === 'gender') {
      gender = value;
    }
  };

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

  const toggleFiltersView = async () => {
    showMoreFilters = !showMoreFilters;

    if (showMoreFilters) {
      const resLanguages = await fetch('/api/languages');
      languageOptions = await resLanguages.json();
    }
  };
</script>

<section class="bg-orange-500 text-white py-12 text-center my-10">
  <h2 class="text-4xl font-bold mb-4">Buche deinen Termin jetzt!</h2>
  <p class="text-lg">Einfach, schnell und unkompliziert.</p>
</section>

<section
  class="container mx-auto max-w-[800px] py-12 px-6 border-2 border-gray-300 rounded-lg shadow-lg my-10 bg-white"
>
  <div class="grid gap-6">
    <form on:submit={performSearch}>
      <div class="grid sm:grid-cols-2 gap-4">
        <div>
          <label for="location" class="block font-medium text-gray-700"
            >PLZ/Ort:</label
          >
          <input
            id="location"
            type="text"
            bind:value={location}
            class="w-full max-w-[200px] border-2 border-gray-300 p-2 rounded-md focus:ring focus:ring-orange-500"
          />
        </div>

        <div class="flex flex-col gap-2">
          <fieldset>
            <legend class="font-medium text-gray-700"
              >Preis pro Sitzung (€)</legend
            >
            <div class="flex items-center gap-2">
              <label for="priceFrom" class="sr-only">Preis von</label>
              <input
                id="priceFrom"
                type="number"
                min="30"
                max="200"
                step="5"
                bind:value={priceRange[0]}
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
                bind:value={priceRange[1]}
                class="w-full border-2 border-gray-300 p-2 rounded-md focus:ring focus:ring-orange-500"
                placeholder="Bis"
              />
            </div>
          </fieldset>
          <div class="flex items-center">
            <input
              id="offersFirstConsultation"
              type="checkbox"
              bind:checked={offersFirstConsultation}
              class="mr-2"
            />
            <label
              for="offersFirstConsultation"
              class="font-medium text-gray-700">Kostenlose Erstberatung</label
            >
          </div>
        </div>
      </div>

      {#if showMoreFilters}
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label for="gender" class="block font-medium text-gray-700"
              >Geschlecht</label
            >
            <Dropdown
              id="gender"
              onChange={dropdownHandleChange}
              selected={gender}
              placeholder="Geschlecht auswählen"
              multiSelect={true}
              type="gender"
              options={['männlich', 'weiblich', 'nicht-binär']}
            />
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
                bind:value={ageRange[0]}
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
                bind:value={ageRange[1]}
                class="w-full border-2 border-gray-300 p-2 rounded-md focus:ring focus:ring-orange-500"
                placeholder="Bis"
              />
            </div>
          </fieldset>

          <div>
            <label for="languages" class="block font-medium text-gray-700"
              >Sprachen</label
            >
            <Dropdown
              id="languages"
              onChange={dropdownHandleChange}
              options={[...topLanguages, ...languageOptions]}
              selected={languages}
              placeholder="Sprachen auswählen"
              multiSelect={true}
              type="languages"
            />
          </div>

          <div>
            <label for="specializations" class="block font-medium text-gray-700"
              >Schwerpunkt</label
            >
            <Dropdown
              id="specializations"
              onChange={dropdownHandleChange}
              options={Object.keys(specializationOptions)}
              selected={specializations}
              placeholder="Schwerpunkt auswählen"
              multiSelect={true}
              type="specializations"
            />
          </div>

          <div class="flex items-center">
            <input
              id="lgbtqFriendly"
              type="checkbox"
              bind:checked={lgbtqFriendly}
              class="mr-2"
            />
            <label for="lgbtqFriendly" class="font-medium text-gray-700"
              >LGBTQ+ freundlich</label
            >
          </div>
        </div>
      {/if}

      <button
        type="button"
        on:click={toggleFiltersView}
        class="w-full md:w-auto bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md transition"
      >
        {showMoreFilters ? 'Weniger Filter anzeigen' : 'Mehr Filter anzeigen'}
      </button>

      <button
        type="submit"
        class="w-full md:w-auto md:mx-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition"
      >
        Suchen
      </button>
    </form>
  </div>

  <hr class="my-10 border-gray-300" />
</section>

<div class="text-center my-10">
  <a
    href="/therapist-signup"
    class="bg-yellow-400 hover:bg-yellow-300 text-white font-bold py-3 px-6 rounded-md transition"
  >
    Registrieren als Therapeut:in
  </a>
</div>
