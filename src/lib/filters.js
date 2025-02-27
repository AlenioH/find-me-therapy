import { writable } from 'svelte/store';

// Store for selected filters (reactive state)
export const filters = writable({
  location: 'Wien',
  priceRange: [50, 150],
  offersFirstConsultation: true,
  gender: [],
  ageRange: [18, 80],
  languages: [],
  specializations: [],
  lgbtqFriendly: false,
});

/**
 * Handles custom dropdown changes for languages, specializations, and gender
 * @param {array} value - The selected values
 * @param {'languages' | 'specializations' | 'gender'} type - The filter type
 */
export function dropdownHandleChange(value, type) {
  if (!['languages', 'specializations', 'gender'].includes(type)) return;

  filters.update((currentFilters) => ({
    ...currentFilters,
    [type]: Array.isArray(value) ? value.filter(Boolean) : [],
  }));
}

/**
 * Converts filter state to URL query parameters
 * @param {object} filterState
 * @returns {string} query string
 */
export function filtersToQuery(filterState) {
  const params = new URLSearchParams();

  if (filterState.location) params.append('location', filterState.location);
  if (filterState.offersFirstConsultation)
    params.append('offersFirstConsultation', 'true');
  if (filterState.lgbtqFriendly) params.append('lgbtqFriendly', 'true');

  params.append('ageRange', filterState.ageRange.join('-'));
  params.append('gender', filterState.gender.join(','));
  params.append('priceRange', filterState.priceRange.join('-'));
  params.append('specializations', filterState.specializations.join('-'));
  params.append('languages', filterState.languages.join(','));

  return params.toString();
}

/**
 * Converts URL query parameters to filter state
 * @param {string} searchParams
 * @returns {object} filter state
 */
export function queryToFilters(searchParams) {
  const params = new URLSearchParams(searchParams);

  return {
    location: params.get('location') || '',
    priceRange: params.get('priceRange')?.split('-').map(Number),
    offersFirstConsultation: params.get('freeFirstConsultation') === 'true',
    gender: params
      .get('gender')
      ?.split(',')
      .filter(Boolean),
    ageRange: params.get('ageRange')?.split('-').map(Number),
    lgbtqFriendly: params.get('lgbtqFriendly') === 'true',
    languages: params.get('languages')?.split(',').filter(Boolean),
    specializations: params.get('specializations')?.split(',').filter(Boolean),
  };
}
