export async function load({ locals }) {
  if (!locals || !locals.user) {
    return { status: 401, error: new Error('Unauthorized') };
  }

  return {
    user: locals.user,
  };
}
