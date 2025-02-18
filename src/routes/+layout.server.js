import { Specialization } from '@prisma/client';

export async function load({ locals }) {
  const specializations = Specialization;

  return {
    user: locals.user || null,
    specializations,
  };
}
