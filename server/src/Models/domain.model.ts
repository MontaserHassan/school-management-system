import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface DomainModel extends mongoose.Document {
    _id: string;
    schoolId: string;
    domainName: string;
    courseTime: string;
    typeOfTime: string;
};


const domainSchema = new mongoose.Schema(
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
        domainId: {
            type: String,
            required: true,
        },
        domainName: {
            type: String,
            required: true,
        },
        courseTime: {
            type: String,
            required: true,
        },
        typeOfTime: {
            type: String,
            default: 'min',
        },
        skills: [
            {
                _id: false,
                skillId: {
                    type: String,
                },
                skillName: {
                    type: String,
                },
            },
        ],
    },
    {
        timestamps: true,
    },
);



const Domain = mongoose.model<DomainModel>('domain', domainSchema);



export {
    Domain,
    DomainModel,
};