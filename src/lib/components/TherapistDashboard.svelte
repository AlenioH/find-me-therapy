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

  // Tariff change logic
  $: selectedTariff = user.roleData?.tariff || 'basic'; // Default to 'basic'
  const tariffs = [
    { value: 'basic', label: 'Basic Plan' },
    { value: 'premium', label: 'Premium Plan' },
    { value: 'elite', label: 'Elite Plan' },
  ];

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

  function changeTariff() {
    fetch('/api/change-tariff', {
      method: 'POST',
      body: JSON.stringify({ tariff: selectedTariff }),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      if (response.ok) alert('Tariff updated successfully!');
      else alert('Failed to update tariff.');
    });
  }

  function deleteProfile() {
    if (
      confirm(
        'Are you sure you want to delete your profile? This action cannot be undone.'
      )
    ) {
      fetch('/api/delete-profile', {
        method: 'DELETE',
      }).then((response) => {
        if (response.ok) alert('Profile deleted successfully!');
        else alert('Failed to delete profile.');
      });
    }
  }
</script>

<div class="flex min-h-screen bg-yellow-50">
  <aside class="w-64 bg-yellow-500 text-white flex-shrink-0 hidden lg:block">
    <div class="p-4">
      <h1 class="text-2xl font-bold">Mein Profil (Therapeut)</h1>
      <nav class="mt-8 space-y-4">
        <ul>
          <li>
            <a href="#my-info" class="flex items-center hover:underline">
              <span class="material-icons">person</span>
              <span class="ml-3">Mein Profil</span>
            </a>
          </li>
          <li>
            <a href="#my-appts" class="flex items-center hover:underline">
              <span class="material-icons">event</span>
              <span class="ml-3">Meine Termine</span>
            </a>
          </li>
          <li>
            <a href="#my-news" class="flex items-center hover:underline">
              <span class="material-icons">article</span>
              <span class="ml-3">Aktuelles</span>
            </a>
          </li>
          <li>
            <div class="relative">
              <select
                bind:value={selectedTariff}
                class="bg-white text-yellow-700 border rounded-lg py-2 px-4 w-full"
                on:change={changeTariff}
              >
                {#each tariffs as { value, label }}
                  <option {value}>{label}</option>
                {/each}
              </select>
            </div>
          </li>
          <li>
            <div class="bg-red-100 p-4 rounded-lg shadow">
              <h3 class="text-lg font-semibold text-red-700">Danger Zone</h3>
              <button
                class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-400 mt-2 w-full"
                on:click={deleteProfile}
              >
                Profil Löschen
              </button>
              <p class="text-sm text-red-600 mt-2">
                Are you sure you want to delete your profile? This action cannot
                be undone.
              </p>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </aside>

  <div class="flex flex-col flex-1">
    <header
      class="bg-yellow-500 text-white shadow-lg p-4 flex justify-between items-center"
    >
      <h2 class="text-xl font-semibold">Willkommen, {user.name}!</h2>
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

      <div id="my-info" class="bg-white shadow-lg rounded-lg p-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-yellow-700">Profile Details</h3>
          <button
            class="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-400"
            on:click={() => alert('Edit button clicked!')}
          >
            Edit
          </button>
        </div>

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
            <li class="col-span-2">
              <span class="font-semibold">Bio:</span>
              <p>{user.roleData.bio || 'No bio available.'}</p>
            </li>
          </ul>

          <div class="mt-4">
            <h4 class="text-md font-semibold text-yellow-700">
              Uploaded Files:
            </h4>
            <ul class="space-y-2">
              {#each user.roleData.files as file}
                <li>
                  <a
                    href={file.url}
                    target="_blank"
                    class="text-blue-500 hover:underline"
                  >
                    {file.name}
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        {/if}
      </div>

      <div id="my-appts" class="bg-white shadow-lg rounded-lg p-4">
        <h3 class="text-lg font-semibold text-yellow-700 mb-4">
          Bevorstehende Termine
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

      <div id="my-news" class="bg-white shadow-lg rounded-lg p-4">
        <h3 class="text-lg font-semibold text-yellow-700 mb-4">Aktuelles</h3>
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
    </main>
  </div>
</div>
