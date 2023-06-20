import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'



// POST /api/signup
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { username, hash, email, name } = req.body;
  let user = await prisma.user.findFirst({
    where: {
      username: username
    }
  });
  if (user){
    res.status(403).send({ message: `Username ${username} already exists!`});
  }

  user = await prisma.user.findFirst({
    where: {
      email: email
    }
  });
  if (user){
    res.status(403).send({ message: `Email ${email} already exists!`});
  }
  const result = await prisma.user.create({
      data: {
        username: username,
        hash: hash,
        email: email,
        name: name,
        posts: {create: []}
      },
    });
  res.json({});
  /*if (!session) {

    res.json(result);
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }*/
}
