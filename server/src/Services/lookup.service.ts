import lookup from 'Interfaces/lookup.interface';
import { Lookup, LookupModel } from '../Models/lookup.model';




// ----------------------------- create lookup -----------------------------


const createLookupDetails = async (lookups: lookup[]) => {
    const newLookups = await Lookup.insertMany(lookups);
    return newLookups;
};


// ----------------------------- create lookup -----------------------------


const isLookupCodeExisting = async (lookupCode: string) => {
    const lookup: LookupModel = await Lookup.findOne({ lookupCode }).select('-__v');
    return lookup;
};


// ----------------------------- get by master code -----------------------------


const getByMasterCode = async (masterCode: string) => {
    const lookups: LookupModel[] = await Lookup.find({ masterCode }).select('-__v');
    return lookups;
};


// ----------------------------- get by master code and parent -----------------------------


const getByMasterCodeAndParent = async (masterCode: string) => {
    const lookups: LookupModel[] = await Lookup.find({ masterCode }).select('lookupCode lookupName');
    return lookups;
};


// ----------------------------- get by code -----------------------------


const getByLookupCode = async (lookupCode: string) => {
    const lookup: LookupModel = await Lookup.findOne({ lookupCode }).select('-__v');
    return lookup;
};


// ----------------------------- update by code -----------------------------


const updateLookupCode = async (lookupCode: string, updatedData: any) => {
    const updatedLookup: LookupModel = await Lookup.findOneAndUpdate({ lookupCode }, updatedData, { new: true }).select('-__v');
    return updatedLookup;
};


// ----------------------------- update by code -----------------------------


const deleteLookupCode = async (lookupCode: string) => {
    const deletedLookup: LookupModel = await Lookup.findOneAndDelete({ lookupCode }).select('-__v');
    return deletedLookup;
};



export default {
    createLookupDetails,
    isLookupCodeExisting,
    getByMasterCode,
    getByMasterCodeAndParent,
    getByLookupCode,
    updateLookupCode,
    deleteLookupCode,
};