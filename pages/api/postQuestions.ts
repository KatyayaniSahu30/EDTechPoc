import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@/prisma/generated/client';


const prisma = new PrismaClient();


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { Categories, Subject, Question, Options, CorrectOptions } = req.body;


      // Create a new question in the database using Prisma
      const newQuestion = await prisma.questions.create({
        data: { Categories, Subject, Question, Options, CorrectOptions },
      });


      res.status(201).json(newQuestion);
    } catch (error) {
      console.error('Error creating question:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }


  await prisma.$disconnect();
};
