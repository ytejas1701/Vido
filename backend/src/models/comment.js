import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    videoId: {
        type: mongoose.Types.ObjectId,
        ref: "Video",
        required: true,
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy:[{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }],
    parentId:{
        type: mongoose.Types.ObjectId,
        ref: "Comment",
        default: null,
    }
});

const Comment = new mongoose.model('Comment', commentSchema);

export default Comment;