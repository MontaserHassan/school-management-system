import { ProgressHistory, ProgressHistoryModel } from '../Models/progress-history.model';



// ----------------------------- create new progress history -----------------------------


const createNewProgressHistory = async (studentId: string, domainId: string, domainName: string, skills: { skillId: string, skillName: string, degree: string }[], activities: { activityId: string, activityName: string, materialName: string, degree: string }[], status: string, completed: boolean) => {
    const newProgressHistory: ProgressHistoryModel = new ProgressHistory({
        studentId: studentId,
        domainId: domainId,
        domainName: domainName,
        skills: skills,
        activities: activities,
        status: status,
        completed: completed,
    });
    await newProgressHistory.save();
    return newProgressHistory;
};


// ----------------------------- get progress history per student -----------------------------


const getProgressHistoryPerStudent = async (studentId: string) => {
    const studentProgressHistory = await ProgressHistory.find({ studentId: studentId, });
    return studentProgressHistory;
};




export default {
    createNewProgressHistory,
    getProgressHistoryPerStudent,
};