import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface TicketModel extends mongoose.Document {
    _id: string;
    employeeId: string;
    parentId: string;
    schoolId: string;
    messages: {
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
        reminder: {
            type: Boolean,
            default: false,
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