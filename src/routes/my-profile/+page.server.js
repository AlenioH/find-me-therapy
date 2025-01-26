import prisma from '$lib/prisma';

export async function load({ locals }) {
  if (!locals || !locals.user) {
    return { status: 401, error: { message: 'Unauthorized' } };
  }

  const { role, id } = locals.user;

  const user = await prisma.users.findUnique({
    where: { id },
  });

  if (!user) throw new Error('User not found');

  let roleData = null;
  let adminApproval = null;
  if (role === 'therapist') {
    roleData = await prisma.therapists.findUnique({
      where: { userId: user.id },
    });
    if (roleData) {
      const serializedRoleData = {
        ...roleData,
        costPerSession: roleData.costPerSession.toNumber(),
        birthdate: roleData.birthdate.toISOString(),
      };
      roleData = serializedRoleData;
      adminApproval = await prisma.adminApprovals.findFirst({
        where: { therapistId: roleData.id },
      });
    }
  } else if (role === 'client') {
    roleData = await prisma.clients.findUnique({ where: { userId: id } });
  }

  return {
    user: {
      id,
      name: user.name,
      email: user.email,
      role,
      roleData,
      adminApproval,
      appointments: null,
    },
  };
}
