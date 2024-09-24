import generateCode from "../Utils/generateCode.util";
import { Student, StudentModel } from "../Models/student.model";
import { SubjectModel } from "Models/subject.model";
import classRoomService from "./class-room.service";



// ----------------------------- create subject -----------------------------


const createStudent = async (studentName: string, parentId: string, schoolId: string, media: string,) => {
    const studentCode = generateCode();
    const newStudent: StudentModel = new Student({
        studentName: studentName,
        parentId: parentId,
        studentCode: studentCode,
        // group: group,
        // classRoom: classRoom,
        // subjects: subjects,
        // mainTopics: mainTopics,
        // studentCost: studentCost,
        // currencyOfCost: currencyOfCost,
        schoolId: schoolId,
        media: media,
    });
    await newStudent.save();
    return newStudent;
};


// ----------------------------- add more data to student -----------------------------


const addMoreDataToStudent = async (studentId: string, classRoom: string, group: string, subjects: any[], mainTopics: any[], studentCost: string, currencyOfCost: string,) => {
    const student: StudentModel = await Student.findByIdAndUpdate(studentId, { $set: { classRoom: classRoom, group: group, subjects: subjects, mainTopics: mainTopics, studentCost: studentCost, currencyOfCost: currencyOfCost } }, { new: true });
    return student;
};


// ----------------------------- add new attendance -----------------------------


const addAttendance = async (studentId: string, teacherId: string, status: string, comment: string) => {
    const student: StudentModel = await Student.findByIdAndUpdate(studentId, { $push: { attendance: { teacherId: teacherId, status: status, comment: comment } } }, { new: true });
    return student;
};


// ----------------------------- update attendance -----------------------------


const updateAttendanceByDate = async (studentId: string, date: Date, status: string, comment: string) => {
    const updatedStudent = await Student.findOneAndUpdate({ _id: studentId, 'attendance.date': date, }, { $set: { 'attendance.$.status': status, 'attendance.$.comment': comment, }, }, { new: true });
    return updatedStudent;
};


// ----------------------------- add new comment -----------------------------


const addComment = async (studentId: string, teacherId: string, comment: string, media: string,) => {
    const student: StudentModel = await Student.findByIdAndUpdate(studentId, { $push: { comments: { teacherId: teacherId, comment: comment, media: media } } }, { new: true });
    return student;
};


// ----------------------------- is teacher in class with student -----------------------------


const isTeacherInClassroom = async (room: string, teacher: string) => {
    const classroom = await classRoomService.getByRoom(room);
    if (!classroom) return false;
    return classroom.teachers.some((tech: { teacherId: string; teacherName: string }) => tech.teacherId === teacher);
};


// ----------------------------- add new topic -----------------------------


const addTopic = async (studentId: string, topicId: string, topicName: string) => {
    const student: StudentModel = await Student.findByIdAndUpdate(studentId, { $push: { mainTopics: { topicId: topicId, topicName: topicName } } }, { new: true });
    return student;
};


// ----------------------------- add new progress status -----------------------------


const addProgressHistory = async (studentId: string, subjectId: string, status: string) => {
    const student: StudentModel = await Student.findOneAndUpdate({ _id: studentId, "subjects.subjectId": subjectId }, { $set: { "subjects.$.progressStatus": status } }, { new: true });
    return student;
};


// ----------------------------- add new degree -----------------------------


const addDegree = async (studentId: string, topicId: string, degree: string) => {
    const student: StudentModel = await Student.findOneAndUpdate({ _id: studentId, "mainTopics.topicId": topicId }, { $set: { "mainTopics.$.degree": degree } }, { new: true });
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


const totalDocument = async (schoolId: string) => {
    const students = await Student.countDocuments({ schoolId: schoolId });
    return students;
};


// ----------------------------- find all with pagination -----------------------------


const findAllStudentsOfSchool = async (schoolId: string, limit: number, skip: number) => {
    const students: StudentModel[] = await Student.find({ schoolId: schoolId }).limit(limit).skip(skip).select('-__v');
    return students;
};


// ----------------------------- get students code -----------------------------


const getStudentsByStudentsCode = async (studentCode: string[]) => {
    const students: StudentModel[] = await Student.find({ code: { $in: studentCode } }).select('-__v');
    return students;
};


// ----------------------------- get all students -----------------------------


const getStudents = async (schoolId: string) => {
    const students: StudentModel[] = await Student.find({ schoolId });
    return students;
};


// ----------------------------- get all students -----------------------------


const getAllStudents = async () => {
    const students: StudentModel[] = await Student.find().select('_id studentName studentCode');
    return students;
};


// ----------------------------- update student -----------------------------


const updateStudentData = async (studentId: string, updatedData: any) => {
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
    addMoreDataToStudent,
    addTopic,
    addAttendance,
    updateAttendanceByDate,
    addComment,
    isTeacherInClassroom,
    addProgressHistory,
    addDegree,
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