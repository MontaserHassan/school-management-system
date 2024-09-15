import { format, addHours } from 'date-fns';

import { Subject, SubjectModel } from "../Models/subject.model";
import generateSchedule from "../Utils/generate-schedule.util";



// ----------------------------- create subject -----------------------------


const createSubject = async (subjectName: string, courseTime: string, schoolId: string) => {
    const newSubject: SubjectModel = new Subject({
        subjectName: (subjectName).toLowerCase(),
        courseTime: courseTime,
        schoolId: schoolId,
    });
    await newSubject.save();
    return newSubject;
};


// ----------------------------- get by id -----------------------------


const getByName = async (subjectName: string, schoolId: string) => {
    const subject: SubjectModel = await Subject.findOne({ subjectName, schoolId: schoolId }).select('-__v');
    return subject;
};


// ----------------------------- get by id -----------------------------


const getById = async (subjectId: string) => {
    const subject: SubjectModel = await Subject.findById(subjectId).select('-__v');
    return subject;
};


// ----------------------------- total document -----------------------------


const totalDocument = async (schoolId: string) => {
    const subjectRooms = await Subject.countDocuments({ schoolId: schoolId });
    return subjectRooms;
};


// ----------------------------- find all with pagination -----------------------------


const findWithPagination = async (limit: number, skip: number) => {
    const subjects: SubjectModel[] = await Subject.find().limit(limit).skip(skip).select('-__v');
    return subjects;
};


// ----------------------------- get all subject -----------------------------


const getAllSubjects = async () => {
    const subjects: SubjectModel[] = await Subject.find().select('_id subjectName');
    return subjects;
};


// ----------------------------- update by id -----------------------------


const updateById = async (subjectId: string, updatedData: any) => {
    const updatedSubject: SubjectModel = await Subject.findByIdAndUpdate(subjectId, updatedData, { new: true }).select('-__v');
    return updatedSubject;
};


// ----------------------------- update by id -----------------------------


const deleteSubject = async (subjectId: string) => {
    const deletedSubject: SubjectModel = await Subject.findByIdAndDelete(subjectId).select('-__v');
    return deletedSubject;
};



export default {
    createSubject,
    getById,
    getByName,
    totalDocument,
    getAllSubjects,
    findWithPagination,
    updateById,
    deleteSubject,
};