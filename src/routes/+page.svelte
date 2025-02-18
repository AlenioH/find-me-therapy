<script>
  import { goto } from '$app/navigation';

  export let data;

  let specializationOptions = data.specializations;

  let location = 'Wien';
  let availability = 'ab sofort';
  let firstConsultationFree = true;

  let gender = '';
  let ageRange = [25, 60];
  let priceRange = [50, 150];
  let languages = [];
  let specializations = [];
  let lgbtqFriendly = false;

  //TODO: languages from API
  let languageOptions = ['Deutsch', 'Englisch', 'Französisch', 'Spanisch'];

  let showMoreFilters = false;

  function performSearch() {
    const params = new URLSearchParams({
      location,
      availability,
      firstConsultationFree: firstConsultationFree ? 'true' : 'false',
      gender,
      ageRange: ageRange.join('-'),
      priceRange: priceRange.join('-'),
      languages: languages.join(','),
      specializations: specializations.join(','),
      lgbtqFriendly: lgbtqFriendly ? 'true' : 'false',
    });

    goto(`/search-results?${params.toString()}`);
  }
</script>

<section class="bg-orange-500 text-white py-12 text-center my-10">
  <h2 class="text-4xl font-bold mb-4">Buche deinen Termin jetzt!</h2>
  <p class="text-lg">Einfach, schnell und unkompliziert.</p>
</section>

<section
  class="container mx-auto py-12 px-6 border-2 border-gray-300 rounded-lg shadow-lg my-10 bg-white"
>
  <div class="grid gap-6">
    <div class="grid sm:grid-cols-3 gap-4">
      <div>
        <label for="location" class="block font-medium text-gray-700"
          >Ort:</label
        >
        <input
          id="location"
          type="text"
          bind:value={location}
          class="w-full border-2 border-gray-300 p-2 rounded-md focus:ring focus:ring-orange-500"
        />
      </div>

      <div>
        <label for="availability" class="block font-medium text-gray-700"
          >Verfügbarkeit:</label
        >
        <select
          id="availability"
          bind:value={availability}
          class="w-full border-2 border-gray-300 p-2 rounded-md focus:ring focus:ring-orange-500"
        >
          <option value="ab sofort">Ab sofort</option>
          <option value="in 1 Woche">In 1 Woche</option>
          <option value="in 1 Monat">In 1 Monat</option>
        </select>
      </div>

      <div class="flex items-center">
        <input
          id="firstConsultationFree"
          type="checkbox"
          bind:checked={firstConsultationFree}
          class="mr-2"
        />
        <label for="firstConsultationFree" class="font-medium text-gray-700"
          >Kostenlose Erstberatung</label
        >
      </div>
    </div>

    {#if showMoreFilters}
      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label for="gender" class="block font-medium text-gray-700"
            >Geschlecht:</label
          >
          <select
            id="gender"
            bind:value={gender}
            class="w-full border-2 border-gray-300 p-2 rounded-md focus:ring focus:ring-orange-500"
          >
            <option value="">Alle</option>
            <option value="männlich">Männlich</option>
            <option value="weiblich">Weiblich</option>
            <option value="nicht_binär">Nicht-binär</option>
          </select>
        </div>

        <div>
          <label for="ageRangeMin" class="block font-medium text-gray-700"
            >Altersspanne:</label
          >
          <div class="flex gap-2 items-center">
            <input
              id="ageRangeMin"
              type="range"
              min="18"
              max="80"
              step="1"
              bind:value={ageRange[0]}
              class="w-full"
            />
          </div>
        </div>

        <div>
          <label for="priceRangeMin" class="block font-medium text-gray-700"
            >Preis pro Sitzung (€):</label
          >
          <div class="flex gap-2 items-center">
            <input
              id="priceRangeMin"
              type="range"
              min="30"
              max="200"
              step="5"
              bind:value={priceRange[0]}
              class="w-full"
            />
            <span class="text-gray-600"
              >{priceRange[0]} - {priceRange[1]} €</span
            >
          </div>
        </div>

        <div>
          <legend class="block font-medium text-gray-700">Sprachen:</legend>
          {#each languageOptions as lang, i}
            <div class="flex items-center">
              <input
                id={'lang-' + i}
                type="checkbox"
                bind:group={languages}
                value={lang}
                class="mr-2"
              />
              <label for={'lang-' + i} class="text-gray-700">{lang}</label>
            </div>
          {/each}
        </div>

        <div>
          <legend class="block font-medium text-gray-700">Schwerpunkte:</legend>
          {#each Object.keys(specializationOptions) as spec, i}
            <div class="flex items-center">
              <input
                id={'spec-' + i}
                type="checkbox"
                bind:group={specializations}
                value={spec}
                class="mr-2"
              />
              <label for={'spec-' + i} class="text-gray-700"
                >{spec.replace('_', ' ')}</label
              >
            </div>
          {/each}
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
      on:click={() => (showMoreFilters = !showMoreFilters)}
      class="w-full md:w-auto bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md transition"
    >
      {showMoreFilters ? 'Weniger Filter anzeigen' : 'Mehr Filter anzeigen'}
    </button>

    <button
      on:click={performSearch}
      class="w-full md:w-auto md:mx-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition"
    >
      Suchen
    </button>
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
