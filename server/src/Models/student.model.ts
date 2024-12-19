import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface Comment {
    teacherId: String;
    comment: string;
    media?: string;
    dateOfComment: Date;
};

interface Domains {
    domainId: String;
    domainName: string;
    progressStatus?: string;
};

interface skills {
    skillId: String;
    skillName: string;
    degree?: String;
};

interface activities {
    skillId: String;
    activityId: String;
    activityName: string;
    materialName: string;
    degree?: String;
};


interface attendance {
    date?: Date;
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
    domains?: Domains[];
    skills?: skills[];
    activities?: activities[];
    attendance?: attendance[];
    comments?: Comment[];
    studentCost?: string;
    currencyOfCost?: string;
    paidAmount: number;
    remainingAmount: number;
    pendingAmount: number;
    paymentStatus: string;
    media: string;
    progressHistory?: any
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
        },
        studentCode: {
            type: String,
            required: true,
            unique: true,
        },
        classRoom: {
            type: String,
            required: false,
        },
        parentId: {
            type: String,
            ref: 'User',
            required: true,
        },
        group: {
            type: String,
            required: false,
            enum: ['3-6', '6-9', '9-12']
        },
        domains: [
            {
                _id: false,
                domainId: {
                    type: String,
                    ref: 'domain',
                    required: true,
                },
                domainName: {
                    type: String,
                    required: true,
                },
                progressStatus: {
                    type: String,
                    enum: ['In Progress', 'Almost Done', 'Completed'],
                    default: "In Progress",
                },
            },
        ],
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
                    enum: ['blue', 'yellow', 'green',],
                    required: false,
                },
            },
        ],
        activities: [
            {
                _id: false,
                skillId: {
                    type: String,
                    ref: 'skill',
                    required: true,
                },
                activityId: {
                    type: String,
                    ref: 'Activity',
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
                    type: String,
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
            required: false,
        },
        currencyOfCost: {
            type: String,
            required: false,
        },
        paidAmount: {
            type: Number,
            required: false,
            default: 0,
        },
        remainingAmount: {
            type: Number,
            required: false,
        },
        pendingAmount: {
            type: Number,
            required: false,
            default: 0,
        },
        paymentStatus: {
            type: String,
            default: "pending",
            enum: ["pending", "paid",],
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