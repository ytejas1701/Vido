import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        immutable: true,
        required: true,
    },
    description: {
        type: String,
        immutable: true,
        required: true,
    },
    creatorId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        immutable: true,
        required: true,
    },
    creatorName: {
        type: String,
        immutable: true,
        required: true,
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    },
    likedBy:[{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }],
    shares: {
        type: Number,
        default:0
    }
});

const Video = new mongoose.model('Video', videoSchema);

export default Video;