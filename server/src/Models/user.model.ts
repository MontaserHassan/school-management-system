import mongoose from "mongoose";
import * as bcrypt from 'bcrypt';
import argon2 from 'argon2';
import { nanoid } from 'nanoid';



interface UserModel extends mongoose.Document {
    userName: string;
    email: string;
    role: string;
    code: string;
    schoolId: string;
    updatePassword: boolean;
    password: string;
    lastSeen: Date;
    logged: boolean;
    verifyPassword(password: string): Promise<boolean>;
}


const userSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => nanoid(),
        },
        userName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            enum: ['parent', 'admin', 'superAdmin', 'teacher', 'director',],
            required: true,
        },
        schoolId: {
            type: String,
            ref: 'School',
            required: false,
        },
        code: {
            type: String,
            required: true,
        },
        updatePassword: {
            type: Boolean,
            default: false,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        lastSeen: {
            type: Date,
        },
        logged: {
            type: Boolean,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                delete ret.password;
            },
        },
    },
);


userSchema.pre('save', async function preSave(next) {
    if (!this.isModified('password')) next();
    try {
        this.password = await argon2.hash(this.password, { type: argon2.argon2id, });
    } catch (error) {
        return next(error);
    };
});

userSchema.methods.verifyPassword = async function verifyPassword(password: string): Promise<boolean> {
    try {
        return await argon2.verify(this.password, password);
    } catch (error) {
        throw new Error('Error verifying password');
    };
};


const User = mongoose.model<UserModel>('user', userSchema);



export {
    User,
    UserModel,
};