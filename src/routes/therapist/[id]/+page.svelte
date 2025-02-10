<script>
  export let data;
  let { therapist } = data;

  // Calculate age from birthdate
  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Prepare languages and specializations as comma-separated strings
  const languages = therapist.languages.join(', ');
  const specializations = therapist.specialization.join(', ').replaceAll('_', ' ');
</script>

<section class="max-w-7xl mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
  <div class="col-span-2">
    <section
      class="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 p-12 rounded-lg shadow-lg mb-8"
    >
      <div class="mb-6">
        <img
          src="/uploads/1b6fe5a9-e7c8-4887-baa7-55bf897b52ad_brooke-cagle--uHVRvDr7pg-unsplash.jpg"
          alt="Therapist Profile"
          class="w-full max-w-lg mx-auto rounded-lg shadow-md"
        />
      </div>

      <h1 class="text-5xl font-extrabold text-white mb-4 text-center">
        {therapist.user.name}
      </h1>
      <div class="text-white text-lg space-y-2 text-left">
        <div>
          <span class="font-semibold">Spezialisierungen:</span>
          <span class="ml-2">{specializations}</span>
        </div>
        <div>
          <span class="font-semibold">Sprachen:</span>
          <span class="ml-2">{languages}</span>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-3xl font-semibold text-gray-800">Über mich</h2>
      <div class="flex items-center mt-2 text-gray-600">
        <svg
          class="w-5 h-5 text-yellow-500 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5.121 17.804A9 9 0 1118.88 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
        </svg>
        <span
          ><strong>Alter:</strong>
          {calculateAge(therapist.birthdate)} Jahre</span
        >
      </div>
      <p class="mt-4 text-gray-600">{therapist.bio}</p>
    </section>

    <section class="mt-12">
      <h2 class="text-3xl font-semibold text-gray-800">
        Weitere Informationen
      </h2>
      <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div class="flex items-center p-2 bg-gray-50 rounded-lg shadow">
          <svg
            class="w-6 h-6 text-yellow-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 11c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3 1.344 3 3 3z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 22s8-4.686 8-11c0-4.418-3.582-8-8-8S4 6.582 4 11c0 6.314 8 11 8 11z"
            ></path>
          </svg>
          <p><strong>Adresse:</strong> {therapist.address}</p>
        </div>

        <div class="flex flex-col p-2 bg-gray-50 rounded-lg shadow">
          <div class="flex items-center mb-2">
            <svg
              class="w-6 h-6 text-yellow-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 1v2m0 18v2m9-11h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l1.414-1.414M6.05 6.05L4.636 7.464"
              ></path>
            </svg>
            <p>
              <strong>Kosten pro Sitzung:</strong> €{therapist.costPerSession}
            </p>
          </div>

          <div class="flex items-center">
            <svg
              class="w-6 h-6 text-yellow-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <p>
              <strong>Sessionsdauer:</strong>
              {therapist.sessionDuration} Minuten
            </p>
          </div>
        </div>

        <div class="flex items-center p-2 bg-gray-50 rounded-lg shadow">
          <svg
            class="w-6 h-6 text-yellow-500 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 015.656 5.656L10 18.657l-6.828-6.829a4 4 0 010-5.656z"
            ></path>
          </svg>
          <p>
            <strong>LGBTQ+ Freundlich:</strong>
            {therapist.lgbtqFriendly ? 'Ja' : 'Nein'}
          </p>
        </div>

        <div class="flex items-center p-2 bg-gray-50 rounded-lg shadow">
          <svg
            class="w-6 h-6 text-yellow-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 5h2l3.6 7.59L8 16h8l-1.6-3.41L19 5h2"
            ></path>
          </svg>
          <p>
            <strong>Bietet Erstberatung an:</strong>
            {therapist.offersFirstConsultation ? 'Ja' : 'Nein'}
          </p>
        </div>
      </div>
    </section>
  </div>

  <div class="sticky-card col-span-1">
    <div class="bg-white shadow-lg rounded-lg p-8 sticky top-20">
      <h3 class="text-xl font-semibold text-gray-800">
        Kontakt & Terminbuchung
      </h3>
      <p class="mt-4 text-gray-600">
        Bereit, Ihre Reise zu beginnen? Nehmen Sie Kontakt auf oder buchen Sie
        einen Termin.
      </p>

      <a
        href="mailto:{therapist.user.email}"
        class="mt-6 inline-block bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 mb-4"
      >
        Nachricht senden
      </a>
      <a
        href="https://calendly.com/{therapist.calendlyLink}"
        class="inline-block bg-purple-200 text-gray-800 px-6 py-3 rounded-lg shadow-md hover:bg-purple-300 transition duration-300"
      >
        Termin buchen
      </a>
    </div>
  </div>
</section>

<style>
  .sticky-card {
    position: -webkit-sticky;
    position: sticky;
    top: 20px;
  }
</style>
