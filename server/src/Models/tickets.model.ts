import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface TicketModel extends mongoose.Document {
    _id: string;
    userOne: { userId: string; userName: string; };
    userTwo: { userId: string; userName: string; };
    schoolId: string;
    messages: {
        sender: { senderId: string; senderName: string; };
        receiver: { receiverId: string; receiverName: string; };
        message: string;
        dateCreation: Date;
    }[];
    read: boolean;
    opened: boolean;
};


const ticketsSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => nanoid(24),
        },
        userOne: {
            userId: {
                type: String,
                ref: 'User',
                required: true,
            },
            userName: {
                type: String,
                required: true,
            },
        },
        userTwo: {
            userId: {
                type: String,
                ref: 'User',
                required: true,
            },
            userName: {
                type: String,
                required: true,
            },
        },
        schoolId: {
            type: String,
            ref: 'School',
            required: false,
        },
        messages: [
            {
                _id: false,
                sender: {
                    senderId: {
                        type: String,
                        ref: 'User',
                        required: true,
                    },
                    senderName: {
                        type: String,
                        required: true,
                    },
                },
                receiver: {
                    receiverId: {
                        type: String,
                        ref: 'User',
                        required: true,
                    },
                    receiverName: {
                        type: String,
                        required: true,
                    },
                },
                message: {
                    type: String,
                    required: true,
                },
                dateCreation: {
                    type: Date,
                    required: true,
                },
            },
        ],
        read: {
            type: Boolean,
            default: false,
        },
        opened: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    },
);



const Ticket = mongoose.model<TicketModel>('ticket', ticketsSchema);



export {
    Ticket,
    TicketModel,
};