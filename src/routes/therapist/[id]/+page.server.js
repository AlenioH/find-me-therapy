import { PrismaClient } from '@prisma/client';
import { serializeData } from '../../../utils/serializedData';

const prisma = new PrismaClient();

export async function load({ params }) {
  const { id } = params;

  try {
    let therapist = await prisma.therapists.findUnique({
      where: { id: Number(id) },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    therapist = serializeData([therapist])[0];
    if (!therapist) {
      return {
        status: 400,
        error: 'Therapist not found',
      };
    }

    return {
      therapist
    };
  } catch (error) {
    return {
      status: 500,
      error: 'Failed to fetch therapist data',
    };
  }
}
