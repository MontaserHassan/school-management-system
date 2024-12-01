import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface PaymentModel extends mongoose.Document {
    _id: string;
    schoolId: string;
    invoiceId: string;
    userId: string;
    studentId?: string;
    paymentId: string;
    name: string;
    amount: string;
    currency: string;
    service: number;
    serviceName: string;
    status: string;
    expirationDate: Date;
    paymentDate: Date;
    paidDate: Date;
    cancelDate: Date;
};


const paymentSchema = new mongoose.Schema(
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
        invoiceId: {
            type: String,
            ref: 'Invoice',
            required: true,
        },
        userId: {
            type: String,
            ref: 'User',
            required: true,
        },
        studentId: {
            type: String,
            ref: 'Student',
            required: false,
        },
        paymentId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        amount: {
            type: String,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        service: {
            type: Number,
            required: true,
        },
        serviceName: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: "Pending",
            enum: ["Pending", "Completed", "Canceled"],
        },
        expirationDate: {
            type: Date,
            required: true,
        },
        paymentDate: {
            type: Date,
            required: true,
            default: new Date(),
        },
        PaidDate: {
            type: Date,
            required: false,
        },
        canceledDate: {
            type: Date,
            required: false,
        },
    },
    {
        timestamps: true,
    },
);



const Payment = mongoose.model<PaymentModel>('payment', paymentSchema);



export {
    Payment,
    PaymentModel,
};