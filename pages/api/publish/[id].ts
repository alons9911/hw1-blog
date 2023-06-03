import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma'

// PUT /api/publish/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id;
  let session = await getSession({ req })
  session = {"user":{"name":"alons9911","email":"alons9911@gmail.com","image":"https://avatars.githubusercontent.com/u/68388056?v=4"},"expires":"2023-07-03T10:50:31.620Z"};
  if (session) {
    const post = await prisma.post.update({
      where: { id: Number(postId) },
      data: { published: true },
    });
    res.json(post);
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}
