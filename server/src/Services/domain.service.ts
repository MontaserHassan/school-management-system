import { Domain, DomainModel } from "../Models/domain.model";



// ----------------------------- create domain -----------------------------


const createDomain = async (domainId: string, domainName: string, courseTime: string, group: string, schoolId: string) => {
    const newDomain: DomainModel = new Domain({
        domainId: domainId,
        domainName: (domainName).toLowerCase(),
        courseTime: courseTime,
        schoolId: schoolId,
        group: group
    });
    await newDomain.save();
    return newDomain;
};


// ----------------------------- get domains number by school id -----------------------------


const getLengthDomainsForSchool = async (schoolId: string, group: string) => {
    const domainSchools = await Domain.countDocuments({ schoolId: schoolId, group: group });
    return domainSchools;
};


// ----------------------------- get by id -----------------------------


const getByName = async (domainName: string, schoolId: string, groupName: string) => {
    const domain: DomainModel = await Domain.findOne({ domainName, schoolId: schoolId, group: groupName }).select('-__v');
    return domain;
};


// ----------------------------- get by id -----------------------------


const getById = async (domainId: string) => {
    const domain: DomainModel = await Domain.findById(domainId).select('-__v');
    return domain;
};


// ----------------------------- total document -----------------------------


const totalDocument = async (schoolId: string) => {
    const domainRooms = await Domain.countDocuments({ schoolId: schoolId });
    return domainRooms;
};


// ----------------------------- find all with pagination -----------------------------


const findWithPagination = async (schoolId: string, limit: number, skip: number) => {
    const domains: DomainModel[] = await Domain.find({ schoolId: schoolId }).limit(limit).skip(skip).select('-__v');
    return domains;
};


// ----------------------------- get all domain for lookups -----------------------------


const getAllDomainsLookups = async (schoolId: string, educationDomainId?: string) => {
    const query: any = { schoolId: schoolId };
    if (educationDomainId === '') query.$or = [{ educationDomainId: { $exists: false } }, { educationDomainId: '' },];
    const domains: DomainModel[] = await Domain.find(query).select('_id domainName');
    return domains;
};


// ----------------------------- add new skill -----------------------------


const addNewSkill = async (domainId: string, skillId: string, skillName: string) => {
    const domain: DomainModel = await Domain.findByIdAndUpdate(domainId, { $push: { skills: { skillId: skillId, skillName: skillName } } }, { new: true }).select('-__v');
    return domain;
};


// ----------------------------- update by id -----------------------------


const updateById = async (domainId: string, updatedData: any) => {
    const updatedDomain: DomainModel = await Domain.findByIdAndUpdate(domainId, updatedData, { new: true }).select('-__v');
    return updatedDomain;
};


// ----------------------------- update by id -----------------------------


const updateByEducationDomainId = async (educationDomainId: string) => {
    const updatedDomain: DomainModel = await Domain.updateMany({ educationDomainId }, { educationDomainId: '' }, { new: true }).select('-__v');
    return updatedDomain;
};


// ----------------------------- delete by id -----------------------------


const deleteDomain = async (domainId: string) => {
    const deletedDomain: DomainModel = await Domain.findByIdAndDelete(domainId).select('-__v');
    return deletedDomain;
};



export default {
    createDomain,
    addNewSkill,
    getLengthDomainsForSchool,
    getById,
    getByName,
    totalDocument,
    getAllDomainsLookups,
    findWithPagination,
    updateById,
    deleteDomain,
    updateByEducationDomainId,
};