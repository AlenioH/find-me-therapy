<script>
  // export let data; // dummy data

  const therapist = {
    name: 'Therapeut A',
    specialization: 'Familientherapie',
    location: 'Wien',
    languages: ['Deutsch', 'Englisch'],
    cost: '50€/h',
  };
</script>

<div class="container mx-auto py-12">
  <h1 class="text-2xl font-bold mb-4">Suchergebnisse</h1>

  <div class="bg-white shadow-lg rounded-lg p-6">
    <h2 class="text-xl font-bold">{therapist.name}</h2>
    <p><strong>Spezialisierung:</strong> {therapist.specialization}</p>
    <p><strong>Ort:</strong> {therapist.location}</p>
    <p><strong>Sprachen:</strong> {therapist.languages.join(', ')}</p>
    <p><strong>Kosten:</strong> {therapist.cost}</p>
  </div>
</div>
