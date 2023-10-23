import { NextApiRequest, NextApiResponse } from 'next'

export default async function logout(req: NextApiRequest, res: NextApiResponse) {
  // Clear the 'token' cookie
  res.setHeader('Set-Cookie', 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');

  // Return a success response
  res.status(200).json({ message: 'Logout successful' });
}