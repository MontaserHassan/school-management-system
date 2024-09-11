import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface InvoiceModel extends mongoose.Document {

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
        studentCode: [
            {
                type: String,
                required: true,
            },
        ],
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
                dateCreation: {
                    type: Date,
                    required: true,
                },
                paid: {
                    type: Boolean,
                    default: false,
                },
                // reminder: {
                //     type: Boolean,
                //     default: false,
                // },
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