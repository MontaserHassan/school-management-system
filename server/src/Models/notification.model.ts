import mongoose from "mongoose";
import { nanoid } from 'nanoid';



interface NotificationModel extends mongoose.Document {
    userId: string;
    schoolId: string;
    header: string;
    message: string;
    read: boolean;
    ticket: { isTicket: boolean, ticketId: string };
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
        ticket: {
            isTicket: {
                type: Boolean,
                default: false,
            },
            ticketId: {
                type: String,
                ref: 'Ticket',
                required: false,
            },
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