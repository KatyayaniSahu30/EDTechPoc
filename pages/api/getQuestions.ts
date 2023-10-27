//import libraries
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@/prisma/generated/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      // Retrieve all questions from the database using Prisma
      const allQuestions = await prisma.questions.findMany();


      res.status(200).json(allQuestions);
    } catch (error) {
      console.error('Error retrieving questions:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }


  await prisma.$disconnect();
};
