import prisma from '../../../lib/prisma';

export async function POST({ request }) {
  const { email, password, name, role } = await request.json();

  try {
    const newUser = await prisma.users.create({
      data: {
        email,
        passwordHash: password, // Ensure you hash the password securely!
        name,
        role,
      },
    });

    if (role === 'client') {
      const client = await prisma.clients.create({
        data: {
          userId: newUser.id,
          preferences: { theme: "dark", notifications: true }, // example preferences
        },
      });

      console.log(client);
    }

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response('Error creating user', { status: 500 });
  }
}
