import { Cycle, CycleModel } from '../Models/cycle.model';



// ----------------------------- create cycle -----------------------------


const createCycle = async (schoolId: string, cycleName: string) => {
    const newCycles: CycleModel = new Cycle({
        schoolId: schoolId,
        cycleName: cycleName
    });
    await newCycles.save();
    return newCycles;
};


// ----------------------------- get Cycle by school id -----------------------------


const getCycleByCycleId = async (cycleId: string) => {
    const cycle: CycleModel = await Cycle.findById(cycleId);
    return cycle;
};


// ----------------------------- get Cycle by school id -----------------------------


const getCycleBySchoolId = async (schoolId: string) => {
    const cycle: CycleModel[] = await Cycle.find({ schoolId: schoolId });
    return cycle;
};


// ----------------------------- add new domain by school id -----------------------------


const addDomainToCycle = async (cycleId: string, domains: { domainId: string, domainName: string, comment: string }[]) => {
    const updateCycle: CycleModel = await Cycle.findByIdAndUpdate(cycleId, { $push: { domains: domains } }, { new: true });
    return updateCycle;
};




export default {
    createCycle,
    getCycleByCycleId,
    getCycleBySchoolId,
    addDomainToCycle,
};