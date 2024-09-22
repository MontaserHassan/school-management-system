import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface ProgressHistoryModel extends mongoose.Document {
    _id: string;
    studentId: string;
    subjectId: string;
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
        completed: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ['In Progress', 'Almost Done', 'Completed'],
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