import mongoose from "mongoose";



interface LookupModel extends mongoose.Document {
    _id: string;
    masterCode: string;
    masterName: string;
    lookupCode: string;
    lookupName: string;
    parentCode: string
};


const lookupSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        masterCode: {
            type: String,
            required: true,
        },
        masterName: {
            type: String,
            required: true,
        },
        lookupCode: {
            type: String,
            required: true,
        },
        lookupName: {
            type: String,
            required: true,
        },
        parentCode: {
            type: String,
            required: false,
            default: '',
        },
    },
    {
        timestamps: true,
    },
);


lookupSchema.index({ lookupCode: 1, masterCode: 1 });



const Lookup = mongoose.model<LookupModel>('lookup', lookupSchema);



export {
    Lookup,
    LookupModel,
};