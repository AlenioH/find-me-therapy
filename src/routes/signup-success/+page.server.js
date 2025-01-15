import { redirect } from "@sveltejs/kit";

export async function load({ cookies }) {
  const role = cookies.get('user_role');
  if (!role) {
    throw redirect(303, '/');
  }
  return { role };
}