import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface SubscriptionSchoolModel extends mongoose.Document {
    _id: string;
    schoolName: string;
    admin: string;
    employees: string[];
    subscriptionFees: string;
    subscriptionDate: Date;
    subscriptionWay: string;
    endOfSubscription: Date;
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
        admin: {
            type: String,
            ref: 'User',
            required: true,
        },
        employees: {
            type: [String],
            ref: 'User',
            default: [],
        },
        subscriptionFees: {
            type: String,
            required: true,
        },
        subscriptionDate: {
            type: Date,
            required: true,
        },
        subscriptionWay: {
            type: String,
            default: 'monthly',
            enum: ['monthly', 'yearly'],
        },
        endOfSubscription: {
            type: Date,
            required: true,
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