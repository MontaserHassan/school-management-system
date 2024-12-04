import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface Domain {
    domainId: string;
    domainName: string;
    isChanged: boolean;
};


interface EducationDomainModel extends mongoose.Document {
    _id: string;
    schoolId: string;
    cycleId: string;
    domainId: string;
    educationDomainName: string;
    educationDomainDescription: string;
    domains: Domain[];
    isChanged: boolean;
};


const educationDomainSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => nanoid(24),
        },
        schoolId: {
            type: String,
            required: true,
        },
        educationDomainName: {
            type: String,
            required: true,
        },
        educationDomainDescription: {
            type: String,
            required: true,
        },
        cycleId: {
            type: String,
            required: true,
        },
        cycleName: {
            type: String,
            required: true,
        },
        domains: [
            {
                _id: false,
                domainId: {
                    type: String,
                    required: true,
                },
                domainName: {
                    type: String,
                    required: true,
                },
                isChanged: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
        isChanged: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    },
);



const EducationDomain = mongoose.model<EducationDomainModel>('education-domain', educationDomainSchema);



export {
    EducationDomain,
    EducationDomainModel,
};