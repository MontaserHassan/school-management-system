import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface SchoolInvoiceModel extends mongoose.Document {
    _id: string;
    schoolId: { schoolId: string, schoolName: string };
    admin: { adminId: string, adminName: string, };
    senderEmail: string;
    transactionId: number;
    invoiceStatus: string;
    media: string;
};


const schoolInvoiceSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => nanoid(24),
        },
        admin: {
            adminId: {
                type: String,
                ref: 'User',
                required: true,
            },
            adminName: {
                type: String,
                required: true,
            },
        },
        senderEmail: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        transactionId: {
            type: Number,
            required: false,
        },
        invoiceStatus: {
            type: String,
            enum: ['paid', 'pending'],
            required: true,
            default: 'pending',
        },
        school: {
            schoolId: {
                type: String,
                ref: 'School',
                required: false,
            },
            schoolName: {
                type: String,
                ref: 'School',
                required: false,
            }
        },
        PaidDate: {
            type: Date,
            required: false,
        },
        media: {
            type: String, // base64
            required: false,
        },
    },
    {
        timestamps: true,
    },
);



const SchoolInvoice = mongoose.model<SchoolInvoiceModel>('schoolInvoice', schoolInvoiceSchema);



export {
    SchoolInvoice,
    SchoolInvoiceModel,
};