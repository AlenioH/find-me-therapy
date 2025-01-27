import prisma from '$lib/prisma';
import { serializeData } from '../../utils/serializedData';

export async function load({}) {
  let therapists = [];

  therapists = await prisma.therapists.findMany({
    where: {},
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  therapists = therapists.map((therapist) => ({
    ...therapist,
    name: therapist.user.name,
  }));

  therapists = serializeData(therapists);

  return {
    therapists,
  };
}
