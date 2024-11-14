import mongoose from "mongoose";



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
};


const eventSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
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
            enum: ['Accepted', 'Rejected', 'Not Response'],
            required: true,
            default: 'Not Response',
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