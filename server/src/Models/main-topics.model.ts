import mongoose from "mongoose";
import { nanoid } from "nanoid";


interface MainTopicModel extends mongoose.Document {
    _id: string;
    topicName: string;
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
    },
    {
        timestamps: true,
    },
);



const MainTopic = mongoose.model<MainTopicModel>('mainTopic', mainTopicSchema);



export {
    MainTopic,
    MainTopicModel,
};