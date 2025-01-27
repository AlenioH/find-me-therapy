import prisma from '$lib/prisma';

export async function POST({ request }) {
  const { userId, news } = await request.json();

  try {
    await prisma.therapists.update({
      where: { userId },
      data: {
        news,
        newsApprovalStatus: 'pending',
        newsUpdatedAt: new Date(),
      },
    });

    return new Response('News submitted for approval', { status: 200 });
  } catch (error) {
    console.error('Error submitting news:', error);
    return new Response('Failed to submit news', { status: 500 });
  }
}
