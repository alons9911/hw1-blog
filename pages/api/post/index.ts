import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import Post from "../../../components/Post";



// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  let { title, content, session, email} = req.body;

  session = {"user":{"name":"alons9911","email":"alons9911@gmail.com","image":"https://avatars.githubusercontent.com/u/68388056?v=4"},"expires":"2023-07-03T10:50:31.620Z"};
  email = "alons9911@gmail.com";
  if (session) {
    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author: { connect: { email: email } },
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}
