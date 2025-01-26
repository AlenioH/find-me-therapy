<script>
  import { user as userStore } from '$lib/stores';

  $: user = $userStore;

  export let appointments = [
    { id: 1, date: '2025-02-01 10:00 AM', clientName: 'John Doe' },
    { id: 2, date: '2025-02-02 2:00 PM', clientName: 'Jane Smith' },
    { id: 3, date: '2025-02-05 9:00 AM', clientName: 'Alice Johnson' },
  ]; // hardcoded appointments for now.

  $: newsText = user.roleData?.news || ''; // Pre-fill the news text if already set.

  $: adminApproval = user.adminApproval?.status;

  function submitNews(news) {
    fetch('/api/news', {
      method: 'POST',
      body: JSON.stringify({ news }),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      if (response.ok) alert('News submitted for admin approval!');
      else alert('Failed to submit news.');
    });
  }
</script>

<div class="flex min-h-screen bg-yellow-50">
  <aside class="w-64 bg-yellow-500 text-white flex-shrink-0 hidden lg:block">
    <div class="p-4">
      <h1 class="text-2xl font-bold">Mein Profil (Therapeut)</h1>
      <nav class="mt-8">
        <ul>
          <li class="mb-4">
            <a href="#" class="flex items-center hover:underline">
              <span class="material-icons">person</span>
              <span class="ml-3">Mein Profil</span>
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center hover:underline">
              <span class="material-icons">settings</span>
              <span class="ml-3">Einstellungen</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>

  <div class="flex flex-col flex-1">
    <header
      class="bg-yellow-500 text-white shadow-lg p-4 flex justify-between items-center"
    >
      <h2 class="text-xl font-semibold">Willkommen, Therapeut!</h2>
    </header>

    <main class="p-6 flex flex-col gap-6">
      {#if adminApproval === 'pending'}
        <div
          class="bg-red-100 border border-red-500 text-red-800 p-4 rounded-lg shadow"
        >
          <strong
            >⚠️ Ihr Profil wird derzeit von einem Administrator überprüft.</strong
          >
          <p class="mt-2">
            Änderungen sind nicht möglich, bis die Überprüfung abgeschlossen
            ist.
          </p>
        </div>
      {/if}

      <div class="bg-white shadow-lg rounded-lg p-4">
        <h3 class="text-lg font-semibold text-yellow-700 mb-4">
          Profile Details
        </h3>

        {#if user.roleData}
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <li>
              <span class="font-semibold">Geschlecht:</span>
              {user.roleData.gender}
            </li>
            <li>
              <span class="font-semibold">Preis pro Stunde:</span> €{user
                .roleData.costPerSession}
            </li>
            <li>
              <span class="font-semibold">Dauer der Sitzung:</span>
              {user.roleData.sessionDuration} Minuten
            </li>
            <li>
              <span class="font-semibold">Adresse:</span>
              {user.roleData.address || 'N/A'}
            </li>
            <li>
              <span class="font-semibold">Sprachen:</span>
              {user.roleData.languages.join(', ')}
            </li>
            <li>
              <span class="font-semibold">Spezialisierungen:</span>
              {user.roleData.specialization.join(', ')}
            </li>
          </ul>
        {/if}
      </div>

      <div class="bg-white shadow-lg rounded-lg p-4">
        <h3 class="text-lg font-semibold text-yellow-700 mb-4">
          Upcoming Appointments
        </h3>
        <ul class="divide-y divide-gray-200">
          {#each appointments as appt}
            <li class="flex justify-between items-center py-2">
              <div>
                <p class="font-semibold">{appt.date}</p>
                <p class="text-sm text-gray-500">{appt.clientName}</p>
              </div>
              <a
                href="/manage-appointment/{appt.id}"
                class="text-orange-500 hover:underline"
              >
                Verwalten
              </a>
            </li>
          {/each}
        </ul>
        {#if appointments.length === 0}
          <p class="text-gray-500">No upcoming appointments found.</p>
        {/if}
      </div>

      <div class="bg-white shadow-lg rounded-lg p-4">
        <h3 class="text-lg font-semibold text-yellow-700 mb-4">
          Aktuelles
        </h3>
        <textarea
          class="w-full border-gray-300 rounded-lg p-2"
          placeholder="Enter news or announcements (e.g., I'll be on vacation in July)"
          bind:value={newsText}
          disabled={adminApproval === 'pending'}
        ></textarea>
        <button
          class="mt-4 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-400"
          on:click={() => submitNews(newsText)}
          disabled={adminApproval === 'pending'}
        >
          Speichern
        </button>
      </div>
      <div class="bg-white shadow rounded-lg p-4">
        <h3 class="text-lg font-semibold text-gray-700 mb-4">Analytics</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="bg-indigo-100 p-4 rounded-lg flex flex-col items-center">
            <h4 class="text-indigo-700 text-lg font-semibold">50</h4>
            <p class="text-gray-500">Sessions Completed</p>
          </div>
          <div class="bg-indigo-100 p-4 rounded-lg flex flex-col items-center">
            <h4 class="text-indigo-700 text-lg font-semibold">4.8</h4>
            <p class="text-gray-500">Average Rating</p>
          </div>
          <div class="bg-indigo-100 p-4 rounded-lg flex flex-col items-center">
            <h4 class="text-indigo-700 text-lg font-semibold">20</h4>
            <p class="text-gray-500">New Clients</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>
