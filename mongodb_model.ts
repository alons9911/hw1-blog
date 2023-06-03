import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
        user: String,
        date: Date,
        post_id: Number,
        link: String
    });

module.exports = mongoose.models.Video || mongoose.model('Video', videoSchema, 'blog');
