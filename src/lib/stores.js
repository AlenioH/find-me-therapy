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

export function updateUserNews(news, status = 'pending', updatedAt = new Date().toISOString()) {
  user.update((current) => ({
    ...current,
    // @ts-ignore
    roleData: {
      ...(current.roleData || {}),
      news,
      newsApprovalStatus: status,
      newsUpdatedAt: updatedAt,
    },
  }));
}
