import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface InvoiceInterface {
    invoiceNumber: string;
    amount: string;
    dateOfCreation: Date;
    paid: boolean;
    media: string;
};


interface InvoiceModel extends mongoose.Document {
    _id: string;
    schoolId: string;
    invoices: InvoiceInterface[];
};


const invoiceSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => nanoid(24),
        },
        schoolId: {
            type: String,
            ref: 'School',
            required: false,
        },
        invoices: [
            {
                invoiceNumber: {
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