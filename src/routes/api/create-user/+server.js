import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import prisma from '$lib/prisma';

const UPLOADS_DIR = path.resolve('./static/uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

export async function POST({ request, cookies }) {

  let formData = new FormData(); // Default to FormData
  let fields = {};
  let files = {};
  try {
    if (request.headers.get('content-type').includes('multipart/form-data')) {
      formData = await request.formData();


      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          files[key] = await handleFileUpload(value);
        } else {
          fields[key] = value;
        }
      }
    } else if (
      request.headers.get('content-type').includes('application/json')
    ) {
      fields = await request.json();
    }

    const { email, password, name, role } = fields;

    let newUser;
    newUser = await prisma.users.create({
      data: {
        email,
        passwordHash: password,
        name,
        role,
      },
    });
    if (role === 'therapist') {
      await createTherapist(newUser.id, fields, files);
    }
    if (role === 'client') {
      await prisma.clients.create({
        data: {
          userId: newUser.id,
        },
      });
    }

    cookies.set('user_role', role, {
      path: '/',
      httpOnly: true,
      secure: true,
    });

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response('Error creating user', { status: 500 });
  }
}

const handleFileUpload = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileName = `${uuidv4()}_${file.name}`;
  const filePath = path.join(UPLOADS_DIR, fileName);
  fs.writeFileSync(filePath, buffer);
  return `/uploads/${fileName}`;
};

const createTherapist = async (userId, fields, files) => {
  const {
    gender,
    bio,
    address,
    languages,
    specialization,
    costPerSession,
    sessionDuration,
    offersFirstConsultation,
    lgbtqFriendly,
    birthdate,
  } = fields;

  const therapist = await prisma.therapists.create({
    data: {
      userId,
      gender,
      bio,
      address,
      languages: JSON.parse(languages),
      specialization: JSON.parse(specialization),
      costPerSession,
      sessionDuration: Number(sessionDuration),
      offersFirstConsultation: !!offersFirstConsultation,
      lgbtqFriendly: !!lgbtqFriendly,
      profilePicture: files.profilePicture || null,
      profileVideo: files.profileVideo || null,
      qualificationsPdf: files.qualificationsPdf || null,
      birthdate,
    },
  });

  await prisma.adminApprovals.create({
    data: {
      therapistId: therapist.id,
      type: 'new_profile',
      status: 'pending',
    },
  });
};
