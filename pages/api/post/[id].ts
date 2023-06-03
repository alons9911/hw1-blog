import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma'


// DELETE /api/post/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id;

  let session = await getSession({ req })
  session = {"user":{"name":"alons9911","email":"alons9911@gmail.com","image":"https://avatars.githubusercontent.com/u/68388056?v=4"},"expires":"2023-07-03T10:50:31.620Z"};
  if (req.method === "DELETE") {
    if (session) {
      const post = await prisma.post.delete({
        where: { id: Number(postId) },
      });
      res.json(post);
    } else {
      res.status(401).send({ message: 'Unauthorized' })
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
