import prisma from '$lib/prisma';

export async function POST({ request }) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return new Response(
        JSON.stringify({ error: 'Token und Passwort sind erforderlich.' }),
        { status: 400 }
      );
    }

    const user = await prisma.users.findUnique({
      where: { resetToken: token, resetTokenExpiry: { gte: new Date() } },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Ungültiger oder abgelaufener Token.' }),
        { status: 400 }
      );
    }

    await prisma.users.update({
      where: { id: user.id },
      data: {
        passwordHash: password,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return new Response(
      JSON.stringify({ message: 'Passwort erfolgreich zurückgesetzt.' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Fehler beim Zurücksetzen des Passworts:', error);
    return new Response(JSON.stringify({ error: 'Interner Serverfehler.' }), {
      status: 500,
    });
  }
}
