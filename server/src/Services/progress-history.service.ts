import { ProgressHistory, ProgressHistoryModel } from '../Models/progress-history.model';



// ----------------------------- create new progress history -----------------------------


const createNewProgressHistory = async (studentId: string, subjectId: string, subjectName: string, topics: { topicId: string, topicName: string, degree: string }[], status: string, completed: boolean) => {
    const newProgressHistory: ProgressHistoryModel = new ProgressHistory({
        studentId: studentId,
        subjectId: subjectId,
        subjectName: subjectName,
        topics: topics,
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