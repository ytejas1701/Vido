import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
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
    type: {
        type: String,
        enum: ["like", "tag"],
        default: false
    },
    seen: {
        type: Boolean,
        default: false
    },
});

const Notification = new mongoose.model('Notification', notificationSchema);

export default Notification;