import mongoose from "mongoose";



interface GroupModel extends mongoose.Document {
    groupName: string;
    classes: [{ classId: string, className: string }]
};

const groupSchema = new mongoose.Schema(
    {
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