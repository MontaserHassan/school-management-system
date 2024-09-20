import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface ProgressHistoryModel extends mongoose.Document {
    _id: string;
    studentId: string;
    subjectName: string;
    degree: string;
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
        subjectName: {
            type: String,
            required: true,
        },
        degree: {
            type: String,
            enum: ['blue', 'yellow', 'green',],
            required: false,
        },
        completed: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);



const ProgressHistory = mongoose.model<ProgressHistoryModel>('progressStatus', progressHistorySchema);



export {
    ProgressHistory,
    ProgressHistoryModel,
};