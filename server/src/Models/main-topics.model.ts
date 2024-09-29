import mongoose from "mongoose";
import { nanoid } from "nanoid";


interface MainTopicModel extends mongoose.Document {
    _id: string;
    topicName: string;
    subject: { subjectId: string, subjectName: string }
    schoolId: string;
    classRoom: string;
};


const mainTopicSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => nanoid(24),
        },
        topicName: {
            type: String,
            min: 3,
            max: 30,
            required: true,
        },
        subject: {
            _id: false,
            subjectId: {
                type: String,
                ref: 'subject',
                required: true,
            },
            subjectName: {
                type: String,
                required: true,
            },
        },
        schoolId: {
            type: String,
            ref: 'subscriptionSchool',
            required: true,
        },
        classRoom: {
            type: String,
            ref: 'classRoom',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

mainTopicSchema.index({ topicName: 1, schoolId: 1, classRoom: 1, }, { unique: true });


const MainTopic = mongoose.model<MainTopicModel>('mainTopic', mainTopicSchema);



export {
    MainTopic,
    MainTopicModel,
};