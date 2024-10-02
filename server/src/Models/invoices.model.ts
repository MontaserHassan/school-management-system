import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface InvoiceInterface {
    invoiceId: string;
    amount: string;
    dateOfCreation: Date;
    paid: boolean;
    // reminder: string;
    media: string;
};


interface InvoiceModel extends mongoose.Document {
    _id: string;
    parentId: string;
    studentCode: string[];
    schoolId: string;
    totalCost: string;
    paidCost: string;
    remainingCost: string;
    invoices: InvoiceInterface[];
};


const invoiceSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => nanoid(24),
        },
        parentId: {
            type: String,
            ref: 'User',
            required: true,
        },
        student: [
            {
                _id: false,
                studentId: {
                    type: String,
                    ref: 'Student',
                    required: true,
                },
                studentName: {
                    type: String,
                    required: true,
                },
            },
        ],
        schoolId: {
            type: String,
            ref: 'School',
            required: false,
        },
        totalCost: {
            type: String,
            required: true,
        },
        paidCost: {
            type: String,
            required: true,
        },
        remainingCosts: {
            type: String,
            required: true,
        },
        invoices: [
            {
                invoiceId: {
                    type: String,
                    required: true,
                },
                amount: {
                    type: String,
                    required: true,
                },
                dateOfCreation: {
                    type: Date,
                    required: true,
                },
                paid: {
                    type: Boolean,
                    default: false,
                },
                media: {
                    type: String, // base64
                    required: false,
                },
            },
        ],
    },
    {
        timestamps: true,
    },
);



const Invoice = mongoose.model<InvoiceModel>('invoice', invoiceSchema);



export {
    Invoice,
    InvoiceModel,
};