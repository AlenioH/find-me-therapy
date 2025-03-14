import prisma from '$lib/prisma';

export async function load({ url }) {
  const token = url.searchParams.get('token');

  if (!token) {
    return { error: 'Kein Token gefunden. Bitte fordere einen neuen Link an.' };
  }

  const user = await prisma.users.findUnique({
    where: { resetToken: token, resetTokenExpiry: { gte: new Date() } },
  });

  if (!user) {
    return { error: 'Ungültiger oder abgelaufener Token. Bitte fordere einen neuen Link an.' };
  }

  return { token };
}
