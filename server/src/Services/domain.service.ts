import { Domain, DomainModel } from "../Models/domain.model";



// ----------------------------- create domain -----------------------------


const createDomain = async (domainId: string, domainName: string, courseTime: string, schoolId: string) => {
    const newDomain: DomainModel = new Domain({
        domainId: domainId,
        domainName: (domainName).toLowerCase(),
        courseTime: courseTime,
        schoolId: schoolId,
    });
    await newDomain.save();
    return newDomain;
};


// ----------------------------- get domains number by school id -----------------------------


const getLengthDomainsForSchool = async (schoolId: string) => {
    const domainSchools = await Domain.countDocuments({ schoolId: schoolId });
    return domainSchools;
};


// ----------------------------- get by id -----------------------------


const getByName = async (domainName: string, schoolId: string) => {
    const domain: DomainModel = await Domain.findOne({ domainName, schoolId: schoolId }).select('-__v');
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


// ----------------------------- get all domain -----------------------------


const getAllDomainsLookups = async (schoolId: string) => {
    const domains: DomainModel[] = await Domain.find({ schoolId }).select('_id domainName');
    return domains;
};


// ----------------------------- update by id -----------------------------


const updateById = async (domainId: string, updatedData: any) => {
    const updatedDomain: DomainModel = await Domain.findByIdAndUpdate(domainId, updatedData, { new: true }).select('-__v');
    return updatedDomain;
};


// ----------------------------- delete by id -----------------------------


const deleteDomain = async (domainId: string) => {
    const deletedDomain: DomainModel = await Domain.findByIdAndDelete(domainId).select('-__v');
    return deletedDomain;
};



export default {
    createDomain,
    getLengthDomainsForSchool,
    getById,
    getByName,
    totalDocument,
    getAllDomainsLookups,
    findWithPagination,
    updateById,
    deleteDomain,
};