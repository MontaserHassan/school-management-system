import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface InvoiceInterface {
    invoiceNumber: string;
    media: string;
};


interface StudentInvoiceModel extends mongoose.Document {
    _id: string;
    parent: { parentId: string, parentName: string };
    student: { studentId: string, studentName: string };
    schoolId: string;
    invoices: InvoiceInterface[];
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
        invoices: [
            {
                invoiceNumber: {
                    type: String,
                    required: true,
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



const StudentInvoice = mongoose.model<StudentInvoiceModel>('studentInvoice', studentInvoiceSchema);



export {
    StudentInvoice,
    StudentInvoiceModel,
};