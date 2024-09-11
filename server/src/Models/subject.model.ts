import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface SubjectModel extends mongoose.Document {
    _id: string;
    subjectName: string;
    courseTime: string;
    typeOfTime: string;
};


const subjectSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => nanoid(24),
        },
        subjectName: {
            type: String,
            required: true,
        },
        courseTime: {
            type: String,
            required: true,
        },
        typeOfTime: {
            type: String,
            default: 'min',
        },
    },
    {
        timestamps: true,
    },
);



const Subject = mongoose.model<SubjectModel>('subject', subjectSchema);



export {
    Subject,
    SubjectModel,
};