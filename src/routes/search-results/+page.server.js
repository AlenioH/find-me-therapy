import prisma from '$lib/prisma';
import { serializeData } from '../../utils/serializedData';

export async function load({ url }) {
  try {
    const location = url.searchParams.get('location') || '';
    const offersFirstConsultation =
      url.searchParams.get('offersFirstConsultation') === 'true';
    const gender = url.searchParams
      .get('gender')
      ?.split(',')
      .map((g) => g.replace('-', '_').replace('ä', 'ae'))
      .filter(Boolean);
    const ageRange = url.searchParams.get('ageRange')?.split('-').map(Number);
    const priceRange = url.searchParams
      .get('priceRange')
      ?.split('-')
      .map(Number);
    const languages = url.searchParams
      .get('languages')
      ?.split(',')
      .filter(Boolean);
    const specializations = url.searchParams
      .get('specializations')
      ?.split(',')
      .filter(Boolean);
    const lgbtqFriendly = url.searchParams.get('lgbtqFriendly') === 'true';

    // calculate birthDate range based on age range
    const today = new Date();
    let birthDateFilter = {};

    if (ageRange?.length === 2) {
      const minBirthYear = today.getFullYear() - ageRange[1]; // older age => earlier birth year
      const maxBirthYear = today.getFullYear() - ageRange[0]; // younger age => later birth year

      birthDateFilter = {
        gte: new Date(`${minBirthYear}-01-01`), // earliest birth date for max age
        lte: new Date(`${maxBirthYear}-12-31`), // latest birth date for min age
      };
    }

    const where = {};

    if (location) {
      where.city = { contains: location, mode: 'insensitive' };
    }

    if (offersFirstConsultation) {
      where.offersFirstConsultation = true;
    }

    if (gender?.length > 0) {
      where.gender = { in: gender };
    }

    if (Object.keys(birthDateFilter).length > 0) {
      where.birthdate = birthDateFilter;
    }

    if (priceRange?.length === 2) {
      where.costPerSession = { gte: priceRange[0], lte: priceRange[1] };
    }
    if (languages?.length > 0) {
      where.languages = { hasSome: languages };
    }

    if (specializations?.length) {
      where.specialization = { hasSome: specializations };
    }

    if (lgbtqFriendly) {
      where.lgbtqFriendly = true;
    }
    let therapists = await prisma.therapists.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            phone: true,
            email: true,
          },
        },
      },
    });

    therapists = serializeData(therapists);

    return {
      therapists,
      location,
      offersFirstConsultation,
      gender,
      ageRange,
      priceRange,
      languages,
      specializations,
      lgbtqFriendly,
    };
  } catch (error) {
    console.error('Error fetching therapists:', error);
    return { therapists: [] };
  }
}
