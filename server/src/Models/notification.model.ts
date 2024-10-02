import mongoose from "mongoose";
import { nanoid } from 'nanoid';



interface NotificationModel extends mongoose.Document {
    email: string;
    schoolId: string;
    message: string;
    read: boolean;
};


const notificationSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => nanoid(),
        },
        userId: {
            type: String,
            required: true,
        },
        schoolId: {
            type: String,
            ref: 'subscriptionSchool',
            required: false,
        },
        header: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        read: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);


const Notification = mongoose.model<NotificationModel>('notification', notificationSchema);



export {
    Notification,
    NotificationModel,
};