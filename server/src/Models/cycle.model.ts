import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface EducationDomain {
    educationDomainId: string;
    educationDomainName: string;
    educationDomainDescription: string;
};

interface CycleModel extends mongoose.Document {
    _id: string;
    schoolId: string;
    cycleName: string;
    educationDomains: EducationDomain[];
};


const cycleSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => nanoid(24),
        },
        schoolId: {
            type: String,
            ref: 'School',
            required: true,
        },
        cycleName: {
            type: String,
            required: true,
        },
        ageGroup: {
            type: String,
            required: true,
        },
        educationDomains: [
            {
                _id: false,
                educationDomainId: {
                    type: String,
                    ref: 'Domain',
                },
                educationDomainName: {
                    type: String,
                },
                educationDomainDescription: {
                    type: String,
                },
            },
        ],
    },
    {
        timestamps: true,
    },
);



const Cycle = mongoose.model<CycleModel>('cycle', cycleSchema);



export {
    Cycle,
    CycleModel,
};