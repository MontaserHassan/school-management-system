import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface TicketModel extends mongoose.Document {
    _id: string;
    employeeId: string;
    parentId: string;
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
        employeeId: {
            type: String,
            ref: 'User',
            required: true,
        },
        parentId: {
            type: String,
            ref: 'User',
            required: true,
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