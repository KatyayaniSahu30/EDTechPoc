import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@/prisma/generated/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { id, name, address, zipcode, course } = req.body;

      // Ensure 'id' is parsed to an integer
      const registrationId = parseInt(id, 10);

      // Find the registration in the database based on the user ID
      const registration = await prisma.registration.findUnique({
        where: { id: registrationId },
      });

      // If the registration is not found, return a 404 Not Found response
      if (!registration) {
        res.status(404).json({ error: 'Registration not found' });
        return;
      }

      // Update the registration in the database with the updated values from the request body
      const updatedRegistration = await prisma.registration.update({
        where: { id: registrationId },
        data: { name, address, zipcode, course },
      });

      res.status(200).json(updatedRegistration);
    } catch (error) {
      console.error('Error updating registration:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }

  await prisma.$disconnect();
};