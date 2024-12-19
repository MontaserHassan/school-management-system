import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface ActivityModel extends mongoose.Document {
    _id: string;
    activityId: string;
    activityName: string;
    materials: string[];
    domainId: string;
    domainName: string;
    skillId: string;
    skillName: string;
    schoolId: string;
    classRoom: string;
};


const activitySchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => nanoid(24),
        },
        activityId: {
            type: String,
            required: true,
        },
        activityName: {
            type: String,
            required: true,
        },
        materials: {
            type: [String],
            required: true,
        },
        skillId: {
            type: String,
            ref: 'skill',
            required: true,
        },
        skillName: {
            type: String,
            required: true,
        },
        domainId: {
            type: String,
            ref: 'domain',
            required: true,
        },
        domainName: {
            type: String,
            required: true,
        },
        schoolId: {
            type: String,
            ref: 'subscriptionSchool',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);


const Activity = mongoose.model<ActivityModel>('activity', activitySchema);



export {
    Activity,
    ActivityModel,
};