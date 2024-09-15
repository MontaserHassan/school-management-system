import generateCode from "../Utils/generateCode.util";
import { Student, StudentModel } from "../Models/student.model";
import { SubjectModel } from "Models/subject.model";



// ----------------------------- create subject -----------------------------


const createStudent = async (studentName: string, group: string, parentId: string, classRoom: string, subjects: any[], mainTopics: any[], studentCost: string, currencyOfCost: string, schoolId: string) => {
    const studentCode = generateCode();
    const newStudent: StudentModel = new Student({
        studentName: studentName,
        group: group,
        parentId: parentId,
        studentCode: studentCode,
        classRoom: classRoom,
        subjects: subjects,
        mainTopics: mainTopics,
        studentCost: studentCost,
        currencyOfCost: currencyOfCost,
        schoolId: schoolId,
    });
    await newStudent.save();
    return newStudent;
};


// ----------------------------- add new attendance -----------------------------


const addAttendance = async (studentId: string, teacherId: string, status: string, comment: string) => {
    const student: StudentModel = await Student.findByIdAndUpdate(studentId, { $push: { attendance: { teacherId: teacherId, status: status, comment: comment } } }, { new: true });
    return student;
};


// ----------------------------- add new comment -----------------------------


const addComment = async (studentId: string, teacherId: string, comment: string, media: string,) => {
    const student: StudentModel = await Student.findByIdAndUpdate(studentId, { $push: { comments: { teacherId: teacherId, comment: comment, media: media } } }, { new: true });
    return student;
};


// ----------------------------- add new topic -----------------------------


const addTopic = async (studentId: string, topicId: string,) => {
    const student: StudentModel = await Student.findByIdAndUpdate(studentId, { $push: { topics: { topicId: topicId } } }, { new: true });
    return student;
};


// ----------------------------- add new progress history -----------------------------


const addProgressHistory = async (studentId: string, subject: SubjectModel, completed: boolean) => {
    const student: StudentModel = await Student.findByIdAndUpdate(studentId, { $push: { progressHistory: { subjectId: subject._id, completed: completed } } }, { new: true });
    return student;
};


// ----------------------------- get student by id -----------------------------


const getStudentById = async (studentId: string) => {
    const student: StudentModel = await Student.findById(studentId).select('-__v');
    return student;
};


// ----------------------------- get student by code -----------------------------


const getStudentByStudentCode = async (studentCode: string) => {
    const student: StudentModel = await Student.findOne({ code: studentCode }).select('-__v').populate([{ path: 'subjects.subjectId', select: 'subjectName', }, { path: 'teacherId', select: 'userName' }]);
    return student;
};


// ----------------------------- get students code -----------------------------


const getStudentsById = async (studentCode: string[]) => {
    const students: StudentModel[] = await Student.find({ code: { $in: studentCode } }).select('-__v');
    return students;
};


// ----------------------------- get total documents -----------------------------


const totalDocument = async () => {
    const students = await Student.countDocuments();
    return students;
};


// ----------------------------- find all with pagination -----------------------------


const findAllStudentsOfSchool = async (limit: number, skip: number) => {
    const students: StudentModel[] = await Student.find().limit(limit).skip(skip).select('-__v');
    return students;
};


// ----------------------------- get students code -----------------------------


const getStudentsByStudentsCode = async (studentCode: string[]) => {
    const students: StudentModel[] = await Student.find({ code: { $in: studentCode } }).select('-__v');
    return students;
};


// ----------------------------- get all students -----------------------------


const getStudents = async () => {
    const students: StudentModel[] = await Student.find();
    return students;
};


// ----------------------------- get all students -----------------------------


const getAllStudents = async () => {
    const students: StudentModel[] = await Student.find().select('_id studentName studentCode');
    return students;
};


// ----------------------------- update student -----------------------------


const updateStudentData = async (studentId: string, updatedData: Record<string, any>) => {
    const student: StudentModel = await Student.findByIdAndUpdate(studentId, updatedData, { new: true }).select('-__v');
    return student;
};


// ----------------------------- delete student -----------------------------


const deleteStudent = async (studentId: string) => {
    const student: StudentModel = await Student.findByIdAndDelete(studentId);
    return student;
};



export default {
    createStudent,
    addAttendance,
    addComment,
    addTopic,
    addProgressHistory,
    totalDocument,
    findAllStudentsOfSchool,
    getStudentById,
    getStudentsById,
    getStudentByStudentCode,
    getStudentsByStudentsCode,
    getAllStudents,
    getStudents,
    updateStudentData,
    deleteStudent,
};