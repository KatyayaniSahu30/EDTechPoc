import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@/prisma/generated/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      // Get the 'id' from the request query
      const { id } = req.query;

      // Use the 'id' to fetch details from the registration page
      const userDetails = await prisma.registration.findUnique({
        where: { id: Number(id) }, // Assuming 'id' is a numeric identifier
      });

      if (!userDetails) {
        // If no details found, return a 404 Not Found response
        res.status(404).json({ message: 'User not found' });
        return;
      }

      // If details are found, return them in the response
      res.status(200).json(userDetails);
    } catch (error) {
      // Handle any errors that occur during the database query or processing
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    // Handle other HTTP methods if needed
    res.status(405).json({ message: 'Method not allowed' });
  }
};