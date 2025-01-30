import { json } from '@sveltejs/kit';

let cachedLanguages = null;
let lastFetchTime = 0;
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours

const HARDCODED_LANGUAGES_DE = [
  'Englisch',
  'Deutsch',
  'Spanisch',
  'Französisch',
  'Italienisch',
  'Portugiesisch',
  'Russisch',
  'Chinesisch',
  'Japanisch',
  'Arabisch',
];

export async function GET() {
  if (cachedLanguages && Date.now() - lastFetchTime < CACHE_DURATION) {
    return json(cachedLanguages || HARDCODED_LANGUAGES_DE);
  }

  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();

    const displayNames = new Intl.DisplayNames(['de'], { type: 'language' });
    const languages = new Set();

    countries.forEach((country) => {
      if (country.languages) {
        Object.entries(country.languages).forEach(([key, value]) => {
          const languageName = displayNames.of(key);

          if (languageName) {
            languages.add(languageName);
          }
        });
      }
    });

    (cachedLanguages = Array.from(languages).sort()),
      (lastFetchTime = Date.now());

    return json(cachedLanguages || HARDCODED_LANGUAGES_DE);
  } catch (error) {
    console.error('Error fetching languages:', error);
    return json(HARDCODED_LANGUAGES_DE, { status: 200 });
  }
}
