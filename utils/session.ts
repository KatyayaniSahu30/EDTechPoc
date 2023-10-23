import { NextApiRequest, NextApiResponse } from 'next';
import { parse, serialize } from 'cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Parse cookies from the request
  const cookies = parse(req.headers.cookie || '');

  // Get the 'user' value from the cookies
  const user = cookies.user || null;
  res.setHeader('Set-Cookie', serialize('user', 'some-user-data', { path: '/' }));

  return res.status(200).json({ user });
};


export default handler;
