import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface InvoiceModel extends mongoose.Document {
    _id: string;
    schoolId: string;
    admin: { adminId: string, adminName: string };
    media: string;
};


const invoiceSchema = new mongoose.Schema(
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
        schoolId: {
            type: String,
            ref: 'School',
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



const Invoice = mongoose.model<InvoiceModel>('invoice', invoiceSchema);



export {
    Invoice,
    InvoiceModel,
};