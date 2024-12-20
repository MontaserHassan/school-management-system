import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface Comment {
    teacherId: String;
    comment: string;
    media?: string;
    dateOfComment: Date;
};

interface subjects {
    subjectId: String;
    subjectName: string;
    degree?: number;
};

interface attendance {
    date?: Date;
    subjectId: String;
    teacherId: String;
    status: string;
    comment?: string;
};


interface progressHistory {
    subjectId: String;
    completed: boolean;
};


interface StudentModel extends mongoose.Document {
    _id: string;
    studentName: string;
    studentCode: string;
    group: string;
    classRoom: string;
    parentId: string;
    subjects?: subjects[];
    attendance?: attendance[];
    comments?: Comment[];
    progressHistory?: progressHistory[];
    studentCost?: string;
    currencyOfCost?: string;
};

const studentSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => nanoid(24),
        },
        studentName: {
            type: String,
            required: true,
            unique: true,
        },
        studentCode: {
            type: String,
            required: true,
            unique: true,
        },
        classRoom: {
            type: String,
            required: true,
        },
        parentId: {
            type: String,
            ref: 'User',
            required: true,
        },
        group: {
            type: String,
            required: true,
            enum: ['3-6', '6-9', '9-12']
        },
        subjects: [
            {
                _id: false,
                subjectId: {
                    type: String,
                    ref: 'Subject',
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
            },
        ],
        mainTopics: [
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
                    enum: ['blue', 'yellow', 'green',],
                    required: false,
                },
            },
        ],
        attendance: [
            {
                _id: false,
                date: {
                    type: Date,
                    required: false,
                    default: new Date(),
                },
                // subjectId: {
                //     type: String,
                //     ref: 'Subject',
                //     required: false,
                // },
                // topicId: {
                //     type: String,
                //     ref: 'MainTopic',
                //     required: false,
                // },
                teacherId: {
                    type: String,
                    ref: 'User',
                    required: true,
                },
                status: {
                    type: String,
                    enum: ['present', 'absent', 'late', 'excused'],
                    required: true,
                },
                comment: {
                    type: String,
                    required: false,
                },
            },
        ],
        comments: [
            {
                _id: false,
                teacherId: {
                    type: String,
                    ref: 'User',
                    required: true,
                },
                comment: {
                    type: String,
                    required: true,
                },
                media: {
                    type: String, // base64
                    required: false,
                },
                dateOfComment: {
                    type: Date,
                    required: true,
                    default: new Date(),
                },
            },
        ],
        progressHistory: [
            {
                _id: false,
                subjectId: {
                    type: String,
                    ref: 'Subject',
                    required: true,
                },
                completed: {
                    type: Boolean,
                    required: true,
                },
            },
        ],
        studentCost: {
            type: String,
            required: true,
        },
        currencyOfCost: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);


const Student = mongoose.model<StudentModel>('student', studentSchema);



export {
    Student,
    StudentModel,
};