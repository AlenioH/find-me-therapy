<script>
  import { goto } from '$app/navigation';

  const performSearch = async () => {
    // simulate a database query
    const dummyResults = ['Therapeut A', 'Therapeut B', 'Therapeut C'];

    // redirect to search-results page with dummy query results
    goto('/search-results', { state: { data: dummyResults } });
  };

  let email = '';
  let password = '';
  let name = '';
  let role = 'client';

  async function handleSubmit() {
    const response = await fetch('/api/create-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, role }),
    });

    if (response.ok) {
      alert('User created successfully');
    } else {
      alert('Failed to create user');
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label for="email">Email</label>
  <input type="email" id="email" bind:value={email} required />

  <label for="password">Password</label>
  <input type="password" id="password" bind:value={password} required />

  <label for="name">Name</label>
  <input type="text" id="name" bind:value={name} required />

  <label for="role">Role</label>
  <select id="role" bind:value={role}>
    <option value="client">Client</option>
    <option value="therapist">Therapist</option>
  </select>

  <button type="submit">Register</button>
</form>

<!-- CAT section -->
<section class="bg-orange-500 text-white py-12 text-center">
  <h2 class="text-4xl font-bold mb-4">Buche deinen Termin jetzt!</h2>
  <p class="text-lg">Einfach, schnell und unkompliziert.</p>
</section>

<!-- search container -->
<section class="container mx-auto py-12 px-4">
  <div class="flex flex-wrap justify-center space-x-4 space-y-4 md:space-y-0">
    <button
      class="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-300"
    >
      Filter 1
    </button>
    <button
      class="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-300"
    >
      Filter 2
    </button>
    <button
      class="bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-300"
    >
      Filter 3
    </button>
  </div>
  <div class="text-center mt-8">
    <button
      class="bg-orange-500 text-white font-bold py-3 px-6 rounded hover:bg-orange-400"
      on:click={performSearch}
    >
      Suchen
    </button>
  </div>
</section>
