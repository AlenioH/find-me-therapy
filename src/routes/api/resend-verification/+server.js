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

    if (user.isVerified) {
      return new Response('Benutzer bereits verifiziert', { status: 400 });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');

    await prisma.users.update({
      where: { email },
      data: { verificationToken },
    });

    const verificationLink = `http://localhost:5173/verify-email?token=${verificationToken}`;
    await sendEmail(
      user.email,
      'Verifiziere deine E-Mail-Adresse',
      `Klicke auf diesen Link, um deine E-Mail zu verifizieren: ${verificationLink}`
    );

    return new Response(
      JSON.stringify({ message: 'Bestätigungs-E-Mail wurde erneut gesendet.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error(
      'Fehler beim erneuten Senden der Bestätigungs-E-Mail:',
      error
    );
    return new Response('Fehler beim Senden der Bestätigungs-E-Mail.', {
      status: 500,
    });
  }
}
