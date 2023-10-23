import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@/prisma/generated/client';
import * as bcrypt from 'bcrypt'; // Import bcrypt

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      console.log(req.body);
      const { name, email, password, address, zipcode, course} = req.body;

      // Validate that the password field is present
      if (!password) {
        throw new Error('Password is required');
      }

      // Hash the user's password
      const saltRounds = 10; // Adjust the number of salt rounds as needed
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      
      // Create a new registration in the database using Prisma
      const newRegistration = await prisma.registration.create({
        data: { name, email, password: hashedPassword, address, zipcode, course}
      });

      res.status(201).json(newRegistration);
    } catch (error: any) {
      console.error('Error creating registration:', error.message); // Log the error message
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }

  await prisma.$disconnect();
};
