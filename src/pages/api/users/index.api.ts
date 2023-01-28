import { prisma } from '@/lib/prisma';
import { setCookie } from 'nookies';
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

      const userExists = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (userExists) {
        return res.status(400).json({
          message: 'User already exists',
        });
      }

      const user = await prisma.user.create({
        data: {
          name,
          username,
        },
      });

      setCookie({ res }, '@ignitecall:userId', user.id, {
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });

      res.status(201).json(user);
      break;
    case 'PUT':
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
