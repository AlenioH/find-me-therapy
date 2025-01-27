import prisma from '$lib/prisma';
import { serializeData } from '../../utils/serializedData';
export async function load({}) {
  let therapists = [];

  therapists = await prisma.therapists.findMany({
    where: {},
  });

  therapists = serializeData(therapists);

  return {
    therapists,
  };
}
