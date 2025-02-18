<script>
  import { goto } from '$app/navigation';

  // Default values
  let location = 'Wien';
  let availability = 'ab sofort';
  let firstConsultationFree = true;
  let specializations = [];
  let lgbtqFriendly = false;

  //TODO: get the specializations
  let specializationOptions = [
    'Verhaltenstherapie',
    'Psychoanalyse',
    'Gestalttheoretische Psychotherapie',
    'Existenzanalyse',
  ];

  // Perform search and navigate with query params
  function performSearch() {
    const params = new URLSearchParams({
      location,
      availability,
      firstConsultationFree: firstConsultationFree ? 'true' : 'false',
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
  class="container mx-auto py-12 px-4 border-2 border-gray-300 rounded-lg shadow-lg my-10"
>
  <div class="grid md:grid-cols-3 gap-6">
    <div>
      <label
        for="location"
        class="block text-lg font-semibold mb-2 text-gray-700">Ort:</label
      >
      <input
        id="location"
        type="text"
        bind:value={location}
        class="w-full border-2 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>

    <div>
      <label
        for="availability"
        class="block text-lg font-semibold mb-2 text-gray-700"
        >Verfügbarkeit:</label
      >
      <select
        id="availability"
        bind:value={availability}
        class="w-full border-2 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        <option value="ab sofort">Ab sofort</option>
        <option value="in 1 Woche">In 1 Woche</option>
        <option value="in 1 Monat">In 1 Monat</option>
      </select>
    </div>

    <div class="flex items-center space-x-3 mt-4 md:mt-0">
      <input
        id="firstConsultationFree"
        type="checkbox"
        bind:checked={firstConsultationFree}
        class="h-5 w-5 text-orange-500"
      />
      <label for="firstConsultationFree" class="text-gray-700 text-lg"
        >Erstgespräch kostenlos</label
      >
    </div>
  </div>

  <div class="mt-6">
    <label
      for="specializations"
      class="block text-lg font-semibold mb-2 text-gray-700"
      >Spezialisierung:</label
    >
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {#each specializationOptions as spec}
        <label class="flex items-center space-x-2">
          <input
            id="specializations"
            type="checkbox"
            bind:group={specializations}
            value={spec}
            class="h-5 w-5 text-orange-500"
          />
          <span class="text-gray-700">{spec}</span>
        </label>
      {/each}
    </div>
  </div>

  <div class="mt-6 flex items-center space-x-3">
    <input
      id="lgbtqFriendly"
      type="checkbox"
      bind:checked={lgbtqFriendly}
      class="h-5 w-5 text-orange-500"
    />
    <label for="lgbtqFriendly" class="text-gray-700 text-lg"
      >LGBTQ+ freundlich</label
    >
  </div>

  <div class="text-center mt-8">
    <button
      class="bg-orange-500 text-white font-bold py-3 px-6 rounded-md hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-300"
      on:click={performSearch}
    >
      Suchen
    </button>
  </div>

  <hr class="my-10 border-gray-300" />
</section>

<div class="text-center my-10">
  <a
    href="/therapist-signup"
    class="bg-yellow-400 text-white font-bold py-3 px-6 rounded-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-300"
  >
    Registrieren als Therapeut:in
  </a>
</div>

<style>
  input,
  select {
    border: 2px solid #ccc;
    padding: 8px;
    border-radius: 5px;
  }

  @media (max-width: 640px) {
    .container {
      padding: 0 2rem;
    }
  }
</style>
