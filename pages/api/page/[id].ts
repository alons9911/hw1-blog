import type {NextApiRequest, NextApiResponse} from 'next'
import {getSession} from 'next-auth/react';
import prisma from '../../../lib/prisma'

// GET /api/page/:id
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const feed = await prisma.post.findMany({
            where: {
                published: true,
            },
            include: {
                author: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    res.status(200).json({
        props: {feed},
    });
}
