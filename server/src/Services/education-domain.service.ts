import { EducationDomain, EducationDomainModel } from "../Models/education-domain.model";



// ----------------------------- create domain -----------------------------


const createDomain = async (schoolId: string, cycleId: string, cycleName: string, educationDomainName: string, educationDomainDescription: string, domains: { domainId: string, domainName: string }[]) => {
    const newEducationDomain: EducationDomainModel = new EducationDomain({
        schoolId: schoolId,
        cycleId: cycleId,
        cycleName: cycleName,
        educationDomainName: (educationDomainName).toLowerCase(),
        educationDomainDescription: (educationDomainDescription).toLowerCase(),
        domains: domains,
    });
    await newEducationDomain.save();
    return newEducationDomain;
};


// ----------------------------- get by id -----------------------------


const getById = async (educationDomainId: string) => {
    const educationDomain: EducationDomainModel = await EducationDomain.findById(educationDomainId).select('-__v');
    return educationDomain;
};


// ----------------------------- get by domain id -----------------------------


const getByDomainId = async (domainId: string) => {
    const result = await EducationDomain.findOne({ domains: { $elemMatch: { domainId } }, });
    return result;
};


// ----------------------------- get by id -----------------------------


const getAll = async () => {
    const educationDomains: EducationDomainModel[] = await EducationDomain.find().select('-__v');
    return educationDomains;
};


// ----------------------------- update by id -----------------------------


const updateById = async (educationDomainId: string, updatedData: any) => {
    const updatedDomain: EducationDomainModel = await EducationDomain.findByIdAndUpdate(educationDomainId, updatedData, { new: true }).select('-__v');
    return updatedDomain;
};


// ----------------------------- update domain by id -----------------------------


const updateDomainsById = async (educationId: string, domainId: string, updatedData: any) => {
    const updatedDomain: EducationDomainModel = await EducationDomain.findOneAndUpdate({ _id: educationId, "domains.domainId": domainId },
        { $set: { "domains.$.domainName": updatedData?.domainName, "domains.$.isChanged": updatedData?.isChanged, }, }, { new: true }).select('-__v');
    return updatedDomain;
};


// ----------------------------- delete by id -----------------------------


const deleteDomain = async (educationDomainId: string) => {
    const deletedDomain: EducationDomainModel = await EducationDomain.findByIdAndDelete(educationDomainId).select('-__v');
    return deletedDomain;
};



export default {
    createDomain,
    getById,
    getByDomainId,
    getAll,
    updateById,
    updateDomainsById,
    deleteDomain,
};