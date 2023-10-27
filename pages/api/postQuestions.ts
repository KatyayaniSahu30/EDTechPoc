//import libraries
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@/prisma/generated/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {

      //console.log('Request Body:', req.body); 
    
      const { course, questions, rightAnswers, currentQuestionIndex, questionType } = req.body;
      console.log('req.body.questions');
     
      console.log('Data to be inserted:', { course, questions, rightAnswers, currentQuestionIndex, questionType }); 

      const newQuestion = await prisma.questions.create({
        data: {
          course,
          questions,
          rightAnswers,
          currentQuestionIndex,
          questionType,
        },
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

