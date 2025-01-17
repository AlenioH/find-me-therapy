import prisma from '$lib/prisma';

export async function load({ locals }) {
  if (!locals || !locals.user) {
    return { status: 401, error: { message: 'Unauthorized' } };
  }

  const { role, id } = locals.user;

  let roleData;
  if (role === 'therapist') {
    roleData = await prisma.therapists.findUnique({ where: { userId: id } });
    if (roleData) {

      const serializedRoleData = {
        ...roleData,
        costPerSession: roleData.costPerSession.toNumber(),
        birthdate: roleData.birthdate.toISOString(),
      };
      roleData = serializedRoleData;
    }
  } else if (role === 'client') {
    roleData = await prisma.clients.findUnique({ where: { userId: id } });
  }


  return {
    user: locals.user || null,
    roleData: roleData || null,
  };
}
