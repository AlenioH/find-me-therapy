import { Specialization } from '@prisma/client';

export async function load({}) {
  const specializations = Specialization;

  return {
    specializations,
  };
}
