
// @ts-ignore
import mongoose from "mongoose";
const Video = require('./mongodb_model.ts');


export const saveMetadataToMongodb = async (user: string | null | undefined, postId: string | string[] | undefined, link: String) => {
    const mongodb_uri: string = process.env.MONGODB_URI != undefined ? process.env.MONGODB_URI : "";
    mongoose.set('strictQuery', false);
    await mongoose.connect(mongodb_uri);

    const video = new Video({
        user: user,
        date: Date.now(),
        post_id: postId,
        link: link
    })


    console.log(video);
    const result = await video.save();
    await mongoose.connection.close();
    return result;

}


export const findPost = async (postId: any) => {
    const mongodb_uri: string = process.env.MONGODB_URI != undefined ? process.env.MONGODB_URI : "";
    mongoose.set('strictQuery', false);
    await mongoose.connect(mongodb_uri);

    const video = await Video.findOne({'post_id': postId});
    console.log(video);
    await mongoose.connection.close();
    return video;
}
