import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@/prisma/generated/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      // Find the registration in the database based on the user ID
      const registration = await prisma.registration.findUnique({
        where: { id : Number(id) },
      });

      // If the registration is not found, return a 404 Not Found response
      if (!registration) {
        res.status(404).json({ error: 'Registration not found' });
        return;
      }

      // Delete the registration from the database
      await prisma.registration.delete({
        where: { id: Number(id) },
      });

      res.status(200).json({ message: 'Registration deleted successfully' });
    } catch (error) {
      console.error('Error deleting registration:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }

  await prisma.$disconnect();
};

