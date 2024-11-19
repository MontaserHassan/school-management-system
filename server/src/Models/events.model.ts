import mongoose from "mongoose";
import { nanoid } from "nanoid";


interface EventModel extends mongoose.Document {
    _id: string;
    eventId: string;
    eventName: string;
    date: Date;
    description: string;
    schoolId: string;
    userId: string;
    username: string;
    response: string;
    expiryDate: Date;
};


const eventSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => nanoid(24),
        },
        eventId: {
            type: String,
            required: true,
        },
        eventName: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        schoolId: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        response: {
            type: String,
            enum: ['Accept', 'Reject', 'Not Response'],
            required: true,
            default: 'Not Response',
        },
        expiryDate: {
            type: Date,
            required: true,
            index: { expireAfterSeconds: 0 },
        },
    },
    {
        timestamps: true,
    },
);


const Event = mongoose.model<EventModel>("event", eventSchema);



export {
    Event,
    EventModel,
}