import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface StudentInvoiceModel extends mongoose.Document {
    _id: string;
    amount: number;
    parent: { parentId: string, parentName: string, };
    student: { studentId: string, studentName: string };
    schoolId: string;
    paidDate: Date;
    invoiceStatus: string;
    media: string;
};


const studentInvoiceSchema = new mongoose.Schema(
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
        amount: {
            type: Number,
            required: true,
        },
        parent: {
            parentId: {
                type: String,
                required: true,
            },
            parentName: {
                type: String,
                required: true,
            },
        },
        senderEmail: {
            type: String,
            required: true
        },
        invoiceStatus: {
            type: String,
            enum: ['paid', 'pending'],
            required: true,
            default: 'pending',
        },
        student: {
            studentId: {
                type: String,
                required: true,
            },
            studentName:
            {
                type: String,
                required: true,
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



const StudentInvoice = mongoose.model<StudentInvoiceModel>('studentInvoice', studentInvoiceSchema);



export {
    StudentInvoice,
    StudentInvoiceModel,
};