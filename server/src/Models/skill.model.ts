import mongoose from "mongoose";
import { nanoid } from "nanoid";



interface activities {
    skillId: string;
    skillName: string;
};

interface SkillModel extends mongoose.Document {
    _id: string;
    skillId: string;
    skillName: string;
    domainId: string;
    domainName: string;
    schoolId: string;
    classRoom: string;
    activities: activities[];
};


const skillSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => nanoid(24),
        },
        skillId: {
            type: String,
            required: true,
        },
        skillName: {
            type: String,
            required: true,
        },
        domainId: {
            type: String,
            ref: 'domain',
            required: true,
        },
        domainName: {
            type: String,
            required: true,
        },
        schoolId: {
            type: String,
            ref: 'subscriptionSchool',
            required: true,
        },
        activities: [
            {
                _id: false,
                skillId: {
                    type: String,
                    required: true,
                },
                skillName: {
                    type: String,
                    required: true,
                },
                materialName: {
                    type: String,
                    required: true,
                },
            },
        ]
    },
    {
        timestamps: true,
    },
);


const Skill = mongoose.model<SkillModel>('skill', skillSchema);



export {
    Skill,
    SkillModel,
};