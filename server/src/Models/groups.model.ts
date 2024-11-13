import mongoose from "mongoose";



interface GroupModel extends mongoose.Document {
    groupName: string;
    classes: [{ classId: string, className: string }]
};

const groupSchema = new mongoose.Schema(
    {
        schoolId: {
            type: String,
            required: true,
        },
        groupName: {
            type: String,
            required: true,
            unique: true,
        },
        classes: [
            {
                _id: false,
                classId: {
                    type: String,
                    required: true,
                    unique: true,
                },
                className: {
                    type: String,
                    required: true,
                },
            }
        ]
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