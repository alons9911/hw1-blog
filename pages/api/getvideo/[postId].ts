import type {NextApiRequest, NextApiResponse} from 'next'
import cloudinary from 'cloudinary';
import {IncomingForm} from 'formidable';
import mongoose from 'mongoose';
import {getSession} from "next-auth/react";


// GET /api/getvideo
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    //
}


