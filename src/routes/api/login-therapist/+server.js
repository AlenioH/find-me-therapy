import prisma from '$lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @ts-ignore
export async function POST({ request, cookies }) {
  const { email, password } = await request.json();

  try {
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user || user.role !== 'therapist') {
      throw new Error('Invalid email or user role.');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      throw new Error('Invalid password.');
    }

    const token = generateToken(user);

    cookies.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response('Error creating user', { status: 500 });
  }
}

const generateToken = (user) => {
  const payload = {
    id: user.id,
    role: user.role,
  };

  //TODO: JWT SECRET
  return jwt.sign(payload, process.env.JWT_SECRET || '1', {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};
