import { string } from "joi";
import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface StudentDegreeModel extends mongoose.Document {
    _id: string,
    studentCode: string;
    subjectsAndSubject: {
        subjectId: string;
        teacherId: string;
        classNumber: string;
        degree?: number;
    }[];
    progressHistory: {}[];
};

const studentDegreeSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => nanoid(24),
        },
        studentCode: {
            type: String,
            required: true,
            unique: true,
        },
        subjects: [
            {
                _id: false,
                subjectId: {
                    type: String,
                    ref: 'Subject',
                    required: true,
                },
                teacherId: {
                    type: String,
                    ref: 'Teacher',
                    required: true,
                },
                classNumber: {
                    type: String,
                    required: true,
                },
                degree: {
                    type: String,
                    enum: ["blue", "yellow", "green"],
                    required: false,
                },
                // progressHistory: [
                //     {
                //         percentage: {
                //             type: String,
                //             required: true,
                //             min: 0,
                //             max: 100,
                //         },
                //         dateOfRating: {
                //             type: Date,
                //             required: true,
                //         },
                //     },
                // ],
            },
        ],
        mainTopics: [
            {
                _id: false,
                topic: {
                    type: String,
                    required: true,
                },
                teacherId: {
                    type: String,
                    ref: 'Teacher',
                    required: true,
                },
                classNumber: {
                    type: String,
                    required: true,
                },
                degree: {
                    type: String,
                    enum: ["blue", "yellow", "green"],
                    required: false,
                },
            },
        ],
    },
    {
        timestamps: true,
    },
);


const StudentClass = mongoose.model<StudentDegreeModel>('studentClass', studentDegreeSchema);



export {
    StudentClass,
    StudentDegreeModel,
};