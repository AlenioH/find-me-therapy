import prisma from '$lib/prisma';
import crypto from 'crypto';
import { sendEmail } from '$lib/server/email';

export async function POST({ request }) {
  try {
    const { email } = await request.json();

    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response('Benutzer nicht gefunden', { status: 404 });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 30); // valid for 30 min

    await prisma.users.update({
      where: { email },
      data: { resetToken, resetTokenExpiry },
    });

    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;
    await sendEmail(
      user.email,
      'Passwort zurücksetzen',
      `Klicke auf diesen Link, um dein Passwort zurückzusetzen: ${resetLink}`
    );

    return new Response(
      JSON.stringify({ message: 'Passwort-Reset-E-Mail wurde gesendet.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Fehler beim Zurücksetzen des Passworts:', error);
    return new Response('Fehler beim Senden der E-Mail.', { status: 500 });
  }
}
