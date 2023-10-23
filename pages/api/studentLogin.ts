import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@/prisma/generated/client';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken package
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
const secretKey = 'rahim1414'; // Replace with your secret key

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      // Find a user by email in the database
      const user = await prisma.registration.findUnique({
        where: { email },
      });

      if (!user) {
        // If the user is not found, return an error response
        return res.status(404).json({ error: 'User not found' });
      }

      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        // If the passwords do not match, return an error response
        return res.status(401).json({ error: 'Incorrect password' });
      } else {
        // Generate a JWT token
        const token = jwt.sign({ userId: user.id, email: user.email, name: user.name }, secretKey);

        // Set the JWT token as a cookie in the response
        res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600`);

        const response = NextResponse.json({ msg: "user logged in" }, { status: 401 })
        response.cookies.set('token', token)

        // Return a success response with the user data and the token
        return res.status(200).json({ message: 'Login successful', user, token });
      }
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};