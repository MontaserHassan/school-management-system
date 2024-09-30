import { SubscriptionSchool, SubscriptionSchoolModel } from "../Models/school.model";
import calculateSubscriptionDate from "../Utils/calculate-subscription-date.util";



// ----------------------------- create school -----------------------------


const createSchool = async (schoolName: string, subscriptionFees: string, subscriptionWay: string = 'monthly', subscriptionStatus: string = 'pending', admin: string, employees: string[] = []) => {
    const subscriptionDate = new Date();
    const endOfSubscription = calculateSubscriptionDate(subscriptionWay, subscriptionDate);
    const newSchool: SubscriptionSchoolModel = new SubscriptionSchool({
        schoolName: schoolName,
        subscriptionFees: subscriptionFees,
        subscriptionWay: subscriptionWay,
        subscriptionStatus: subscriptionStatus,
        subscriptionDate: subscriptionDate,
        endOfSubscription: endOfSubscription,
        admin: admin,
        employees: employees,
    });
    await newSchool.save();
    return newSchool;
};


// ----------------------------- add new employee -----------------------------



const addEmployee = async (schoolId: string, employeeId: string,) => {
    const school: SubscriptionSchoolModel = await SubscriptionSchool.findByIdAndUpdate(schoolId, { $addToSet: { employees: employeeId } }, { new: true });
    return school;
};


// ----------------------------- get school by id -----------------------------


const getSchoolByName = async (schoolName: string) => {
    const school: SubscriptionSchoolModel = await SubscriptionSchool.findOne({ schoolName }).select('-__v');
    return school;
};


// ----------------------------- get school by id -----------------------------


const getSchoolById = async (schoolId: string) => {
    const school: SubscriptionSchoolModel = await SubscriptionSchool.findById(schoolId).select('-__v');
    return school;
};


// ----------------------------- get all schools -----------------------------


const getAllSchools = async () => {
    const schools: SubscriptionSchoolModel[] = await SubscriptionSchool.find();
    return schools;
};


// ----------------------------- get total documents -----------------------------


const totalDocument = async () => {
    const SubscriptionSchools = await SubscriptionSchool.countDocuments();
    return SubscriptionSchools;
};


// ----------------------------- find all with pagination -----------------------------


const findWithPagination = async (limit: number, skip: number) => {
    const SubscriptionSchools: SubscriptionSchoolModel[] = await SubscriptionSchool.find().limit(limit).skip(skip).select('-__v');
    return SubscriptionSchools;
};


// ----------------------------- update school -----------------------------


const updateSchoolData = async (schoolId: string, updatedData: Record<string, any>) => {
    const school: SubscriptionSchoolModel = await SubscriptionSchool.findByIdAndUpdate(schoolId, updatedData, { new: true }).select('-__v');
    return school;
};


// ----------------------------- delete school -----------------------------


const deleteSchool = async (schoolId: string) => {
    const school: SubscriptionSchoolModel = await SubscriptionSchool.findByIdAndDelete(schoolId);
    return school;
};



export default {
    createSchool,
    addEmployee,
    getSchoolById,
    getSchoolByName,
    getAllSchools,
    totalDocument,
    findWithPagination,
    updateSchoolData,
    deleteSchool,
};