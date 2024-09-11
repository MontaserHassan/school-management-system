import mongoose from "mongoose";



interface UserTokenModel extends mongoose.Document {
    secretKey: string;
    token: string;
    userId: string;
    expiryTime: Date;
    active: boolean
};

const userTokenSchema = new mongoose.Schema(
    {
        secretKey: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        token: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        expiryTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,
        },
        active: {
            type: Boolean,
            default: true,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);


userTokenSchema.index({ endTime: 1 }, { expireAfterSeconds: 3600 });

const UserToken = mongoose.model<UserTokenModel>('userToken', userTokenSchema);



export {
    UserToken,
    UserTokenModel,
};