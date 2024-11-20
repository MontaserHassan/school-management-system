import generateCode from "../Utils/generateCode.util";
import { Student, StudentModel } from "../Models/student.model";
import classRoomService from "./class-room.service";



// ----------------------------- create student -----------------------------


const createStudent = async (studentName: string, parentId: string, schoolId: string, media: string,) => {
    const studentCode = generateCode();
    const newStudent: StudentModel = new Student({
        studentName: studentName,
        parentId: parentId,
        studentCode: studentCode,
        schoolId: schoolId,
        media: media,
    });
    await newStudent.save();
    return newStudent;
};


// ----------------------------- add more data to student -----------------------------


const addMoreDataToStudent = async (studentId: string, classRoom: string, group: string, domains: any[], skills: any[], studentCost: string, currencyOfCost: string,) => {
    const student: StudentModel = await Student.findByIdAndUpdate(studentId, { $set: { classRoom: classRoom, group: group, domains: domains, skills: skills, studentCost: studentCost, currencyOfCost: currencyOfCost } }, { new: true });
    return student;
};


// ----------------------------- add new attendance -----------------------------


const addAttendance = async (studentId: string, status: string, comment: string) => {
    const student: StudentModel = await Student.findByIdAndUpdate(studentId, { $push: { attendance: { status: status, comment: comment } } }, { new: true });
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


// ----------------------------- add new skill -----------------------------


const addSkill = async (studentId: string, skillId: string, skillName: string) => {
    const student: StudentModel = await Student.findByIdAndUpdate(studentId, { $push: { skills: { skillId: skillId, skillName: skillName } } }, { new: true });
    return student;
};


// ----------------------------- add new activity -----------------------------


const addActivity = async (studentId: string, activityId: string, activityName: string, materialName: string) => {
    const activity: StudentModel = await Student.findByIdAndUpdate(studentId, { $push: { activities: { activityId: activityId, activityName: activityName, materialName: materialName } } }, { new: true });
    return activity;
};


// ----------------------------- update skill -----------------------------


const updateSkillDataInStudents = async (skillId: string, newSkillName: string) => {
    const updatedStudents = await Student.updateMany({ "skills.skillId": skillId }, { $set: { "skills.$.skillName": newSkillName } }, { multi: true });
    return updatedStudents;
};


// ----------------------------- add new progress status -----------------------------


const addProgressStatus = async (studentId: string, domainId: string, status: string) => {
    const student: StudentModel = await Student.findOneAndUpdate({ _id: studentId, "domains.domainId": domainId }, { $set: { "domains.$.progressStatus": status } }, { new: true });
    return student;
};


// ----------------------------- add new degree -----------------------------


const addDegree = async (studentId: string, skillId: string, degree: string) => {
    const student: StudentModel = await Student.findOneAndUpdate({ _id: studentId, "skills.skillId": skillId }, { $set: { "skills.$.degree": degree } }, { new: true });
    return student;
};


// ----------------------------- get students by class room -----------------------------


const getStudentsByClassRoom = async (room: string) => {
    const students: StudentModel[] = await Student.find({ classRoom: room }).select('-__v');
    return students;
};



const updateStudentByClassRoomData = async (studentId: string) => {
    const students = await Student.findByIdAndUpdate(studentId, { $unset: { classRoom: "", domains: [], skills: [], attendance: [], studentCost: '', currencyOfCost: '', group: '' }, }, { new: true });
    return students;
};


// ----------------------------- get student by id -----------------------------


const getStudentById = async (studentId: string) => {
    const student: StudentModel = await Student.findById(studentId).select('-__v');
    return student;
};


// ----------------------------- get student by code -----------------------------


const getStudentByStudentCode = async (studentCode: string) => {
    const student: StudentModel = await Student.findOne({ code: studentCode }).select('-__v').populate([{ path: 'domains.domainId', select: 'domainName', }, { path: 'teacherId', select: 'userName' }]);
    return student;
};


// ----------------------------- get students code -----------------------------


const getStudentsById = async (studentCode: string[]) => {
    const students: StudentModel[] = await Student.find({ code: { $in: studentCode } }).select('-__v');
    return students;
};


// ----------------------------- get total documents -----------------------------


const totalDocumentByClassRoom = async (schoolId: string, classRoom: string) => {
    const students = await Student.countDocuments({ schoolId: schoolId, classRoom: classRoom });
    return students;
};


// ----------------------------- get total documents -----------------------------


const totalDocument = async (schoolId: string, parentId?: string) => {
    let students: any;
    if (parentId) {
        students = await Student.countDocuments({ schoolId: schoolId, parentId: parentId });
    } else {
        students = await Student.countDocuments({ schoolId: schoolId });
    };
    return students;
};


// ----------------------------- find all with pagination -----------------------------


const findAllStudentsOfSchool = async (schoolId: string, limit: number, skip: number, data?: { key: string, value: string }) => {
    let students: StudentModel[];
    if (data && data.key === 'parentId') {
        students = await Student.find({ schoolId: schoolId, parentId: data.value }).limit(limit).skip(skip).select('-__v');
    } else if (data && data.key === 'classRoom') {
        students = await Student.find({ schoolId: schoolId, classRoom: data.value }).limit(limit).skip(skip).select('-__v');
    } else {
        students = await Student.find({ schoolId: schoolId }).limit(limit).skip(skip).select('-__v');
    };
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


// ----------------------------- get all students by parent id -----------------------------


const getStudentsByParentId = async (parentId: string, schoolId: string) => {
    const students: StudentModel[] = await Student.find({ schoolId, parentId });
    return students;
};


// ----------------------------- get all students -----------------------------


const getAllStudentsLookups = async (schoolId: string, existClassRoom?: boolean) => {
    let query: any = { schoolId };
    if (existClassRoom) query.classRoom = { $in: [null, ''] };
    const students: StudentModel[] = await Student.find(query).select('_id studentName studentCode');
    return students;
};


// ----------------------------- update student -----------------------------


const updateStudentData = async (studentId: string, updatedData: any) => {
    const student: StudentModel = await Student.findByIdAndUpdate(studentId, updatedData, { new: true }).select('-__v');
    return student;
};


// ----------------------------- delete students data related class -----------------------------


const deleteStudentDataToClass = async (studentId: string) => {
    const student: StudentModel = await Student.findByIdAndDelete(studentId);
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
    addSkill,
    addActivity,
    updateSkillDataInStudents,
    addAttendance,
    updateAttendanceByDate,
    addComment,
    isTeacherInClassroom,
    addProgressStatus,
    addDegree,
    totalDocument,
    totalDocumentByClassRoom,
    findAllStudentsOfSchool,
    getStudentsByClassRoom,
    getStudentById,
    getStudentsById,
    getStudentsByParentId,
    getStudentByStudentCode,
    getStudentsByStudentsCode,
    getAllStudentsLookups,
    getStudents,
    updateStudentData,
    updateStudentByClassRoomData,
    deleteStudent,
    deleteStudentDataToClass,
};