import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface SubscriptionSchoolModel extends mongoose.Document {
    _id: string;
    schoolName: string;
    admins: string[];
    employees: string[];
    subscriptionFees: string;
    subscriptionDate: Date;
    subscriptionStatus: string;
};


const subscriptionSchoolSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => nanoid(24),
        },
        schoolName: {
            type: String,
            required: true,
        },
        admins: {
            type: [String],
            default: [],
        },
        employees: {
            type: [String],
            default: [],
        },
        subscriptionFees: {
            type: String,
            required: true,
        },
        subscriptionDate: {
            type: Date,
            default: new Date(),
        },
        subscriptionWay: {
            type: String,
            default: 'monthly',
            enum: ['monthly', 'yearly'],
        },
        subscriptionStatus: {
            type: String,
            default: 'pending',
            enum: ['pending', 'paid', 'expired'],
        },
    },
    {
        timestamps: true,
    },
);



const SubscriptionSchool = mongoose.model<SubscriptionSchoolModel>('subscriptionSchool', subscriptionSchoolSchema);



export {
    SubscriptionSchool,
    SubscriptionSchoolModel,
};