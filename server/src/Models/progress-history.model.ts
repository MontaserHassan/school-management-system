import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface ProgressHistoryModel extends mongoose.Document {
    _id: string;
    studentId: string;
    subjectId: string;
    topics: { topicId: string, topicName: string, degree: string }[];
    subjectName: string;
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
        subjectId: {
            type: String,
            ref: 'Subject',
            required: true,
        },
        subjectName: {
            type: String,
            required: true,
        },
        topics: [
            {
                _id: false,
                topicId: {
                    type: String,
                    ref: 'MainTopic',
                    required: true,
                },
                topicName: {
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