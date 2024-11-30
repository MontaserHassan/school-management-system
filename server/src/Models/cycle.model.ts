import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface domain {
    _id: string;
    domainId: string;
    domainName: string;
    comment: string;
};

interface cycle {
    cycleId: string;
    cycleName: string;
    domains: domain[];
}

interface CycleModel extends mongoose.Document {
    _id: string;
    schoolId: string;
    cycleOne: cycle;
    cycleTwo: cycle;
    cycleThree: cycle;
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
        domains: [
            {
                _id: false,
                domainId: {
                    type: String,
                    ref: 'Domain',
                },
                domainName: {
                    type: String,
                },
                comment: {
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