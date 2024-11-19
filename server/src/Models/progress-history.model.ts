import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface ProgressHistoryModel extends mongoose.Document {
    _id: string;
    studentId: string;
    domainNameId: string;
    domainNameName: string;
    skills: { skillId: string, skillName: string, degree: string }[];
    status: string;
    completed: boolean;
};


const progressHistorySchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => nanoid(24),
        },
        studentId: {
            type: String,
            ref: 'Student',
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
        skills: [
            {
                _id: false,
                skillId: {
                    type: String,
                    ref: 'skill',
                    required: true,
                },
                skillName: {
                    type: String,
                    required: true,
                },
                degree: {
                    type: String,
                    required: true,
                },
            },
        ],
        completed: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);



const ProgressHistory = mongoose.model<ProgressHistoryModel>('progressHistory', progressHistorySchema);



export {
    ProgressHistory,
    ProgressHistoryModel,
};