import type {NextApiRequest, NextApiResponse} from 'next'
import cloudinary from 'cloudinary';
import {IncomingForm} from 'formidable';
import mongoose from 'mongoose';
import {getSession} from "next-auth/react";
import {saveMetadataToMongodb} from "../../../mongodb_operations";


cloudinary.v2.config({
    cloud_name: 'demugmpcg',
    api_key: '674271996522799',
    api_secret: 'XsAJkxaSan6WRcJR6rN1ZDUJr0M'
});

export const config = {
    api: {
        bodyParser: false,
    },
};

// POST /api/upload
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const postId = req.query.postId;
    const session = await getSession({req})
    if (session) {
        const data = await new Promise((resolve, reject) => {
            const form = new IncomingForm();

            form.parse(req, (err: any, fields: any, files: any) => {
                if (err) return reject(err);
                resolve({fields, files});
            });
        });
        const file = data?.files?.inputFile.filepath;

        // @ts-ignore
        const response = await cloudinary.v2.uploader.upload(file, {
            resource_type: 'video',
            public_id: postId,
        });

        const result = await saveMetadataToMongodb(session.user?.username, postId, response.url);

        res.json(response);
    } else {
        res.status(500);
    }


}

