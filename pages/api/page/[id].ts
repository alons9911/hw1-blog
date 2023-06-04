import type {NextApiRequest, NextApiResponse} from 'next'
import {getSession} from 'next-auth/react';
import prisma from '../../../lib/prisma'
import {findPosts} from "../../../mongodb_operations";

// GET /api/page/:id
// Required fields in body: title
// Optional fields in body: content


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const pageNumber = req.query.id;
    let {query, postsPerPage} = req.body;
    let posts = await prisma.post.findMany(Object.assign(query, {
        skip: pageNumber * postsPerPage,
        take: postsPerPage
    }));
    const videos = await findPosts(posts.map((post) => post.id));
    posts = posts.map((post) => Object.assign(post, {videoUrl: videos[post.id]}));
    res.status(200).json(posts);
}
