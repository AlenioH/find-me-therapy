import prisma from '$lib/prisma';

// @ts-ignore
export async function POST({ request, cookies }) {
  const {
    email,
    password,
    name,
    role,
    gender,
    bio,
    address,
    languages,
    specialization,
    costPerSession,
    sessionDuration,
    offersFirstConsultation,
    lgbtqFriendly,
    profilePicture,
    profileVideo,
    qualificationsPdf,
    birthdate,
  } = await request.json();

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
          preferences: { theme: 'dark', notifications: true }, // example preferences
        },
      });

      console.log(client);
    }

    if (role === 'therapist') {
      const therapist = await prisma.therapists.create({
        data: {
          userId: newUser.id,
          gender,
          bio,
          address,
          languages,
          specialization,
          costPerSession,
          sessionDuration,
          offersFirstConsultation,
          lgbtqFriendly,
          profilePicture,
          profileVideo,
          qualificationsPdf,
          birthdate,
        },
      });
      console.log(therapist);

      const approval = await prisma.adminApprovals.create({
        data: {
          therapistId: therapist.id,
          type: 'new_profile',
          status: 'pending',
        },
      });
      console.log('approval', approval);
    }

    cookies.set('user_role', role, { path: '/', httpOnly: true, secure: true });

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response('Error creating user', { status: 500 });
  }
}
