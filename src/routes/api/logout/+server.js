export async function POST({ cookies }) {
  cookies.set('session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });

  return new Response(null, { status: 204 }); // No Content response
}
