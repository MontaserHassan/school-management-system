import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface Subjects {
    subjectId: string;
    subjectName: string
    startTime: string;
    endTime: string;
};

interface Schedule {
    day: string;
    subjects: Subjects[];
};

interface ClassRoomModel extends mongoose.Document {
    _id: string;
    room: string;
    group: string;
    teachers: { teacherId: string, teacherName: string }[],
    students?: { studentId: string, studentName: string }[],
    mainTopics?: { topicId: string, topicName: string }[]
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
        room: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 3,
        },
        group: {
            type: String,
            required: true,
            enum: ['3-6', '6-9', '9-12']
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
                    ref: 'Subject',
                    required: true,
                },
                studentName: {
                    type: String,
                    required: true,
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
            default: 'usd',
            enum: ['usd', 'eur', 'ps',],
        },
    },
    {
        timestamps: true,
    },
);



const ClassRoom = mongoose.model<ClassRoomModel>('classRoom', classRoomSchema);



export {
    ClassRoom,
    ClassRoomModel,
};