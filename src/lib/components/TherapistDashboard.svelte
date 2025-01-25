<script>
  export let user;
  export let userData;
</script>


<div class="flex min-h-screen bg-gray-100">
  <aside
    class="w-64 bg-white border-r border-gray-200 flex-shrink-0 hidden lg:block"
  >
    <div class="p-4">
      <h1 class="text-2xl font-bold text-gray-700">Mein Profil (Therapeut)</h1>
      <nav class="mt-8">
        <ul>
          <li class="mb-4">
            <a
              href="#"
              class="flex items-center text-gray-600 hover:text-indigo-500"
            >
              <span class="material-icons">+</span>
              <span class="ml-3">Mein Profil</span>
            </a>
          </li>

          <li>
            <a
              href="#"
              class="flex items-center text-gray-600 hover:text-indigo-500"
            >
              <span class="material-icons">+</span>
              <span class="ml-3">Einstellungen</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>

  <div class="flex flex-col flex-1">
    <header class="bg-white shadow-sm p-4 flex justify-between items-center">
      <h2 class="text-xl font-semibold text-gray-700">
        Willkommen, Therapeut!
      </h2>
    </header>

    <main class="p-6 flex flex-col gap-6">
      <div
        class="bg-white shadow rounded-lg p-4 flex justify-between items-center"
      >
        <div>
          <h3 class="text-lg font-semibold text-gray-700">
            Profile Completion
          </h3>
          <p class="text-sm text-gray-500">
            Complete your profile to attract more clients.
          </p>
        </div>
        <div class="flex items-center">
          <div class="w-48 bg-gray-200 h-2 rounded-full overflow-hidden">
            <div class="bg-indigo-500 h-2" style="width: 75%;"></div>
          </div>
          <span class="ml-3 text-gray-700 text-sm">75%</span>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-4">
        <h3 class="text-lg font-semibold text-gray-700 mb-4">
          Profile Details
        </h3>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <li>
            <span class="font-semibold">Geschlecht:</span>
            {userData.gender}
          </li>
          <li><span class="font-semibold">Sprachen:</span> [Languages]</li>
          <li>
            <span class="font-semibold">Spezialisierung:</span> [Specialization]
          </li>
          <li>
            <span class="font-semibold">Preis pro Stunde:</span> $[CostPerSession]
          </li>
          <li>
            <span class="font-semibold">Session Duration:</span> [SessionDuration]
            mins
          </li>
          <li><span class="font-semibold">Addresse:</span> [Address]</li>
        </ul>
      </div>

      <div class="bg-white shadow rounded-lg p-4">
        <h3 class="text-lg font-semibold text-gray-700 mb-4">Analytics</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            class="bg-indigo-100 p-4 rounded-lg flex flex-col items-center"
          >
            <h4 class="text-indigo-700 text-lg font-semibold">50</h4>
            <p class="text-gray-500">Sessions Completed</p>
          </div>
          <div
            class="bg-indigo-100 p-4 rounded-lg flex flex-col items-center"
          >
            <h4 class="text-indigo-700 text-lg font-semibold">4.8</h4>
            <p class="text-gray-500">Average Rating</p>
          </div>
          <div
            class="bg-indigo-100 p-4 rounded-lg flex flex-col items-center"
          >
            <h4 class="text-indigo-700 text-lg font-semibold">20</h4>
            <p class="text-gray-500">New Clients</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>