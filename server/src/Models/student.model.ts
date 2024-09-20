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
    progressStatus?: string;
    degree?: String;
};

interface attendance {
    date?: Date;
    subjectId: String;
    teacherId: String;
    status: string;
    comment?: string;
};

interface StudentModel extends mongoose.Document {
    _id: string;
    schoolId?: string;
    studentName: string;
    studentCode: string;
    group: string;
    classRoom: string;
    parentId: string;
    subjects?: subjects[];
    attendance?: attendance[];
    comments?: Comment[];
    studentCost?: string;
    currencyOfCost?: string;
    media: string;
};


const studentSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => nanoid(24),
        },
        schoolId: {
            type: String,
            ref: 'School',
            required: false,
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
                    default: "",
                    required: false,
                },
                progressStatus: {
                    type: String,
                    enum: ['In Progress', 'Almost Done', 'Completed'],
                    default: "In Progress",
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
                    default: () => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return today;
                    },
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
        studentCost: {
            type: String,
            required: true,
        },
        currencyOfCost: {
            type: String,
            required: true,
        },
        media: {
            type: String,
            required: false,
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