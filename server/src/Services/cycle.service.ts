import { Cycle, CycleModel } from '../Models/cycle.model';



// ----------------------------- create cycle -----------------------------


const createCycle = async (schoolId: string, ageGroup: string, cycleName: string) => {
    const newCycles: CycleModel = new Cycle({
        schoolId: schoolId,
        ageGroup: ageGroup,
        cycleName: cycleName
    });
    await newCycles.save();
    return newCycles;
};


// ----------------------------- get Cycle by school id -----------------------------


const getCycleForLookups = async (schoolId: string) => {
    const cycle: CycleModel[] = await Cycle.find({ schoolId }).sort({ ageGroup: 1 }).select('_id cycleName');
    return cycle;
};


// ----------------------------- get Cycle by school id -----------------------------


const getCycleByCycleId = async (cycleId: string) => {
    const cycle: CycleModel = await Cycle.findById(cycleId).select('-__v');
    return cycle;
};


// ----------------------------- get Cycle by school id -----------------------------


const getCycleBySchoolId = async (schoolId: string) => {
    const cycle: CycleModel[] = await Cycle.find({ schoolId: schoolId }).sort({ ageGroup: 1 }).select('-__v');
    return cycle;
};


// ----------------------------- add new domain by school id -----------------------------


const addEducationDomainToCycle = async (cycleId: string, educationDomains: { educationDomainId: string, educationDomainsName: string, educationDomainDescription: string }) => {
    const updateCycle: CycleModel = await Cycle.findByIdAndUpdate(cycleId, { $push: { educationDomains: educationDomains } }, { new: true }).select('-__v');
    return updateCycle;
};




export default {
    createCycle,
    getCycleByCycleId,
    getCycleForLookups,
    getCycleBySchoolId,
    addEducationDomainToCycle,
};