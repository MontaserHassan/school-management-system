import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface GroupModel extends mongoose.Document {
    _id: string;
    groupName: string;
    classes: [{ classId: string, className: string }]
};

const groupSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => nanoid(24),
        },
        groupName: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);


const Group = mongoose.model<GroupModel>('group', groupSchema);



export {
    Group,
    GroupModel,
};