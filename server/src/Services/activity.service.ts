import { Activity, ActivityModel } from '../Models/activity.model';



// ----------------------------- create activity -----------------------------


const createActivity = async (activityId: string, activityName: string, materialName: string, skillId: string, skillName: string, room: string, domainId: string, domainName: string, schoolId: string) => {
    const newActivity: ActivityModel = new Activity({
        activityId: activityId,
        activityName: (activityName).toLowerCase(),
        materialName: (materialName).toLowerCase(),
        skillId: skillId,
        skillName: skillName,
        domainId: domainId,
        domainName: domainName,
        schoolId: schoolId,
        classRoom: room,
    });
    await newActivity.save();
    return newActivity;
};


// ----------------------------- get by name -----------------------------


const getByName = async (activityName: string) => {
    const activity: ActivityModel = await Activity.findOne({ activityName }).select('-__v');
    return activity;
};


// ----------------------------- get by activity id -----------------------------


const getBySkillId = async (skillId: string) => {
    const activities: ActivityModel[] = await Activity.find({ skillId: skillId }).select('-__v');
    return activities;
};


// ----------------------------- get activity length -----------------------------


const getLengthActivities = async (skillId: string) => {
    const activities = await Activity.countDocuments({ skillId: skillId });
    return activities;
};


// ----------------------------- get by id -----------------------------


const getById = async (activityId: string) => {
    const activity: ActivityModel = await Activity.findById(activityId).select('-__v');
    return activity;
};


// ----------------------------- get activities by id -----------------------------


const getActivitiesById = async (id: string[]) => {
    const activities = await Activity.find({ _id: { $in: id } }).select('-__v');
    return activities;
};


// ----------------------------- total document -----------------------------


const totalDocument = async (schoolId: string) => {
    const activities = await Activity.countDocuments({ schoolId });
    return activities;
};


// ----------------------------- find all with pagination -----------------------------


const findWithPagination = async (schoolId: string, limit: number, skip: number) => {
    const activities: ActivityModel[] = await Activity.find({ schoolId: schoolId }).limit(limit).skip(skip).select('-__v');
    return activities;
};


// ----------------------------- find all -----------------------------


const getAllActivitiesLookups = async (schoolId: string) => {
    const activities: ActivityModel[] = await Activity.find({ schoolId }).select('-__v');
    return activities;
};


// ----------------------------- update by id -----------------------------


const updateById = async (activityId: string, updatedData: any) => {
    const updatedActivity: ActivityModel = await Activity.findByIdAndUpdate(activityId, updatedData, { new: true }).select('-__v');
    return updatedActivity;
};


// ----------------------------- update by id -----------------------------


const deleteActivity = async (activityId: string) => {
    const deletedActivity: ActivityModel = await Activity.findByIdAndDelete(activityId).select('-__v');
    return deletedActivity;
};



export default {
    createActivity,
    getById,
    getBySkillId,
    getByName,
    getLengthActivities,
    getActivitiesById,
    totalDocument,
    getAllActivitiesLookups,
    findWithPagination,
    updateById,
    deleteActivity,
};