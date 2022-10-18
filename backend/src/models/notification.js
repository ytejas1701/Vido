import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    seen: {
        type: Boolean,
        default: false
    }
});

const Notification = new mongoose.model('Notification', notificationSchema);

export default Notification;