<script>
  export let data; // dummy data
  console.log('data', data);

  const therapists = data.therapists;

  // Function to generate a dummy "next possible appointment" date (e.g., next week)
  function getNextAppointment() {
    const now = new Date();
    now.setDate(now.getDate() + 7); // Adds 7 days to the current date for the next possible appointment
    return now.toLocaleString('de-DE'); // Formatting date in German locale
  }

  // Dummy filters
  let filters = {
    gender: 'any',
    language: 'any',
    specialization: 'any',
    cost: 'any',
  };

  const genderOptions = ['any', 'male', 'female', 'non-binary'];
  const languageOptions = ['any', 'English', 'Spanish', 'German'];
  const specializationOptions = ['any', 'Anxiety', 'Depression', 'Mindfulness'];
  const costOptions = ['any', 'under 50€', '50€ - 100€', 'above 100€'];
</script>

<div class="flex">
  <div class="w-64 bg-orange-100 p-6 hidden lg:block">
    <h3 class="text-xl font-bold text-orange-600 mb-4">Filter</h3>

    <div class="mb-4">
      <h4 class="text-lg font-semibold text-gray-700">Geschlecht</h4>
      <select
        bind:value={filters.gender}
        class="w-full mt-2 p-2 border rounded"
      >
        {#each genderOptions as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
    </div>

    <div class="mb-4">
      <h4 class="text-lg font-semibold text-gray-700">Sprache</h4>
      <select
        bind:value={filters.language}
        class="w-full mt-2 p-2 border rounded"
      >
        {#each languageOptions as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
    </div>

    <div class="mb-4">
      <h4 class="text-lg font-semibold text-gray-700">Spezialisierung</h4>
      <select
        bind:value={filters.specialization}
        class="w-full mt-2 p-2 border rounded"
      >
        {#each specializationOptions as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
    </div>

    <div class="mb-4">
      <h4 class="text-lg font-semibold text-gray-700">Kosten</h4>
      <select bind:value={filters.cost} class="w-full mt-2 p-2 border rounded">
        {#each costOptions as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
    </div>

    <button
      class="bg-yellow-500 text-black font-bold py-2 px-4 rounded-full hover:bg-yellow-400 transition-colors w-full"
    >
      Filter anwenden
    </button>
  </div>

  <section class="flex-1 p-4">
    <h2 class="text-3xl font-bold mb-6 text-center text-orange-600">
      Suchergebnisse für Therapeuten
    </h2>

    {#if therapists.length === 0}
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
                {therapist.gender === 'male'
                  ? 'Herr'
                  : therapist.gender === 'female'
                    ? 'Frau'
                    : 'Therapeut'} Maxine Musterfau
              </div>
            </div>

            <div class="p-4">
              <h3 class="text-xl font-semibold text-lavender-700">
                Maxine Musterfrau
              </h3>
              <p class="text-gray-600">{therapist.specialization.join(', ')}</p>
              <p class="text-gray-500 mt-2">{therapist.bio}</p>

              <div
                class="mt-4 flex justify-between items-center text-sm text-gray-500"
              >
                <span>{therapist.languages.join(', ')}</span>
                <span>{therapist.sessionDuration} min Sitzung</span>
              </div>

              <div
                class="mt-4 flex justify-between items-center text-sm text-gray-500"
              >
                <span
                  >{therapist.lgbtqFriendly
                    ? 'LGBTQ+ Freundlich'
                    : 'Nicht LGBTQ+ Freundlich'}</span
                >
                <span>€{therapist.costPerSession} pro Sitzung</span>
              </div>

              <div class="mt-4 text-sm text-gray-500">
                Nächster verfügbarer Termin: {getNextAppointment()}
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
  /* Custom lavender color */
  .text-lavender-700 {
    color: #8a4fff;
  }
  .bg-lavender-500 {
    background-color: #8a4fff;
  }
  .hover\:bg-lavender-400:hover {
    background-color: #9c5dfc;
  }

  /* Sidebar styling */
  .lg\:block {
    display: block;
  }

  /* Responsive Layout */
  .flex {
    display: flex;
  }
  .flex-1 {
    flex: 1;
  }

  /* Grid styling to display one therapist per row */
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr)); /* One per row */
  }

  /* Make the layout responsive on larger screens */
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
