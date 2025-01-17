import jwt from 'jsonwebtoken';

export async function handle({ event, resolve }) {
  const token = event.cookies.get('session');

  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET || '1');
      event.locals.user = user;
    } catch {
      event.locals.user = null;
    }
  } else {
    event.locals.user = null;
  }

  const response = await resolve(event);
  console.log('resp', response);
  return response;
}
