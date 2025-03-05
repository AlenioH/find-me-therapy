import prisma from '$lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @ts-ignore
export async function POST({ request, cookies }) {
  const { email, password } = await request.json();

  try {
    // fetch the user from the general `users` table
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return json({ error: 'Invalid email or password' }, { status: 401 });
    }

    if (!user.isVerified) {
      return json(
        { error: 'Email not verified. Please check your inbox.' },
        { status: 403 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // fetch role-specific information
    let roleSpecificData = null;
    if (user.role === 'therapist') {
      roleSpecificData = await prisma.therapists.findUnique({
        where: { userId: user.id },
      });
    } else if (user.role === 'client') {
      roleSpecificData = await prisma.clients.findUnique({
        where: { userId: user.id },
      });
    }

    // generate a token that includes the user's role
    const token = generateToken(user);

    // set the token in cookies
    cookies.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    // return user data
    return new Response(
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        roleData: roleSpecificData,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error during login:', error);
    return new Response(JSON.stringify({ error: 'Error during login.' }), {
      status: 500,
    });
  }
}
//TODO: JWT SECRET
const generateToken = (user) => {
  const payload = {
    id: user.id,
    role: user.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET || '1', {
    expiresIn: process.env.JWT_EXPIRATION || '1d',
  });
};
