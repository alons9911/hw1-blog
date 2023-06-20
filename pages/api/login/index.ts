import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'



// POST /api/login
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { username, hash } = req.body;
  let user = await prisma.user.findFirst({
    where: {
      username: username
    }
  });
  if (!user || user.hash !== hash){
    res.status(403).send({message: `Username or password incorrect`});
  }
  else
    res.json({username: username, email: user.email});
  /*if (!session) {
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
  }*/
}
