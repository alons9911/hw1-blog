import type { NextApiRequest, NextApiResponse } from 'next'
import { csrf } from "../../../lib/csrf";

import prisma from '../../../lib/prisma'
import Post from "../../../components/Post";



// POST /api/post
// Required fields in body: title
// Optional fields in body: content
async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, content, currentUser, email, videoUrl} = req.body;

  if (currentUser) {
    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        videoUrl: videoUrl,
        author: { connect: { email: email } },
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}

export default csrf(handle);
