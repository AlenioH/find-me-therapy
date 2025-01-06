import prisma from '$lib/prisma'; // Import Prisma client

export async function POST({ request }) {
  const { email, password, name, role } = await request.json();

  try {
    // Create a new user in the database
    const newUser = await prisma.users.create({
      data: {
        email,
        passwordHash: password,  // Note: You should hash the password before storing it!
        name,
        role,
      },
    });
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response('Error creating user', { status: 500 });
  }
}
