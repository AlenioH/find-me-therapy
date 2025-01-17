export async function load({ locals }) {
  if (!locals || !locals.user) {
    return { status: 401, error: {message: 'Unauthorized'} };
  }

  return {
    user: locals.user || null,
  };
}
