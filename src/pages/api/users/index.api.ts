import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method, query } = req;

  switch (method) {
    case 'GET':
      break;
    case 'POST':
      const { name, username } = req.body;

      const user = await prisma.user.create({
        data: {
          name,
          username,
        },
      });
      res.status(201).end(user);
      break;
    case 'PUT':
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
