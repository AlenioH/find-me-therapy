import { writable } from 'svelte/store';

export const user = writable({
  id: null,
  name: '',
  email: '',
  role: '',
  roleData: null,
  adminApproval: null,
  appointments: null
});

export function updateUser(data) {
  user.update((current) => ({ ...current, ...data }));
}
