import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface Domains {
    domainId: string;
    domainName: string
    startTime: string;
    endTime: string;
};

interface Schedule {
    day: string;
    domains: Domains[];
};

interface ClassRoomModel extends mongoose.Document {
    _id: string;
    room: string;
    group: string;
    schoolId: string;
    teachers: { teacherId: string, teacherName: string }[],
    students?: { studentId: string, studentName: string }[],
    skills?: { skillId: string, skillName: string }[]
    schedule?: Schedule[];
    studentCost: string;
    currencyOfCost: string;
};


const classRoomSchema = new mongoose.Schema(
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
        room: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 3,
        },
        group: {
            type: String,
            required: true,
            enum: ['2-3', '3-6', '9-12']
        },
        teachers: [
            {
                _id: false,
                teacherId: {
                    type: String,
                    ref: 'User',
                    required: true,
                },
                teacherName: {
                    type: String,
                    required: true,
                },
            },
        ],
        students: [
            {
                _id: false,
                studentId: {
                    type: String,
                    ref: 'Student',
                    required: true,
                },
                studentName: {
                    type: String,
                    required: true,
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
                }
            },
        ],
        schedule: [
            {
                _id: false,
                day: {
                    type: String,
                    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    required: true,
                },
                domains: [
                    {
                        _id: false,
                        domainId: {
                            type: String,
                            ref: 'Domain',
                            required: true,
                        },
                        domainName: {
                            type: String,
                            required: true,
                        },
                        startTime: {
                            type: String,
                            required: true,
                        },
                        endTime: {
                            type: String,
                            required: true,
                        },
                    },
                ],
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

classRoomSchema.index({ schoolId: 1, room: 1 }, { unique: true });


const ClassRoom = mongoose.model<ClassRoomModel>('classRoom', classRoomSchema);



export {
    ClassRoom,
    ClassRoomModel,
};