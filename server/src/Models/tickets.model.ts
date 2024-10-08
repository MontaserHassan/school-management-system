import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface TicketModel extends mongoose.Document {
    _id: string;
    userId1: string;
    userId2: string;
    schoolId: string;
    messages: {
        sender: { senderId: string; senderName: string; };
        receiver: { receiverId: string; receiverName: string; };
        content: string;
        dateCreation: Date;
    }[];
    opened: boolean;
};


const ticketsSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => nanoid(24),
        },
        user1: {
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
        user2: {
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
                content: {
                    type: String,
                    required: true,
                },
                dateCreation: {
                    type: Date,
                    required: true,
                },
            },
        ],
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