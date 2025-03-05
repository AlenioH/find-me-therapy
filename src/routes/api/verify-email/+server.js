import prisma from '$lib/prisma';

export async function GET({ url }) {
  try {
    const token = url.searchParams.get('token');
    if (!token) return new Response('Invalid token', { status: 400 });

    const user = await prisma.users.findUnique({
      where: { verificationToken: token },
    });

    if (!user) return new Response('Invalid or expired token', { status: 400 });


    await prisma.users.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null, // remove token after use
      },
    });

    return new Response('✅ Email verified! You can now log in.', { status: 200 });
  } catch (error) {
    console.error('Verification Error:', error);
    return new Response('Error verifying email', { status: 500 });
  }
}
