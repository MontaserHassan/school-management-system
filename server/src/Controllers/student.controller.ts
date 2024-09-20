import { NextFunction, Request, Response } from "express";

import { classRoomService, lookupService, studentService, subjectService, userService } from "../Services/index.service";
import { errorClassRoomMessage, errorStudentMessage, errorSubjectMessage, successStudentMessage, successSubjectMessage } from "../Messages/index.message";
import CustomError from "../Utils/customError.util";
import IResponse from '../Interfaces/response.interface';
import { StudentModel } from "../Models/student.model";



// ----------------------------- create student -----------------------------


const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentName, classRoom, parentCode, media } = req.body;
        const { schoolId } = req.user;
        const isClassRoomExisting = await classRoomService.getByRoom(classRoom);
        if (!isClassRoomExisting) throw new CustomError(errorClassRoomMessage.NOT_FOUND_ROOM, 400, "classRoom");
        const isParentExisting = await userService.getByCode(parentCode);
        if (!isParentExisting) throw new CustomError(errorStudentMessage.PARENT_NOT_EXIST, 404, "parentCode");
        const subjectsData = isClassRoomExisting.schedule ? isClassRoomExisting.schedule.flatMap(schedule => {
            return schedule.subjects.map(subject => ({ subjectId: subject.subjectId, subjectName: subject.subjectName }));
        }) : [];
        const mainTopics = isClassRoomExisting.mainTopics ? isClassRoomExisting.mainTopics.map(topic => { return { topicId: topic.topicId, topicName: topic.topicName } }) : [];
        const studentCost = isClassRoomExisting.studentCost;
        const currencyOfCost = isClassRoomExisting.currencyOfCost;
        const group = isClassRoomExisting.group;
        const subjects = Array.from(new Map(subjectsData.map(sub => [sub.subjectId.toString(), sub])).values());
        const newStudent = await studentService.createStudent(studentName.toLowerCase(), group, parentCode, classRoom, subjects, mainTopics, studentCost, currencyOfCost, schoolId, media);
        if (!newStudent) throw new CustomError(errorStudentMessage.DOES_NOT_CREATED, 400, "student");
        const updatedClassroom = await classRoomService.addStudent(classRoom, [{ studentId: (newStudent._id).toString(), studentName }]);
        if (!updatedClassroom) throw new CustomError(errorClassRoomMessage.DOES_NOT_UPDATED, 400, "classRoom");
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: successSubjectMessage.CREATED,
            data: {
                student: newStudent,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- add attendance -----------------------------


const addAttendance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId, status, comment } = req.body;
        const teacherId = req.user.userId;
        const student = await studentService.getStudentById(studentId);
        if (!student) throw new CustomError(errorStudentMessage.DOES_NOT_UPDATED, 400, "student");
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const attendanceRecord = student?.attendance?.find((record: any) => {
            const recordDate = new Date(record.date);
            recordDate.setHours(0, 0, 0, 0);
            return recordDate.getTime() === today.getTime();
        });
        let updatedStudent: StudentModel;
        const attendanceStatus = await lookupService.getById(status);
        if (!attendanceStatus) throw new CustomError(errorStudentMessage.LOOKUPS_NOT_EXISTING, 400, "student");
        if (attendanceRecord) {
            updatedStudent = await studentService.updateAttendanceByDate(student._id, today, attendanceStatus.lookupName, comment);
        } else {
            updatedStudent = await studentService.addAttendance(student._id, teacherId, attendanceStatus.lookupName, comment);
        };
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: successStudentMessage.ADD_ATTENDANCE,
            data: {
                student: updatedStudent,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- add comment -----------------------------


const addComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId, comment, media } = req.body;
        const teacherId = req.user.userId;
        const student = await studentService.getStudentById(studentId);
        if (!student) throw new CustomError(errorStudentMessage.DOES_NOT_CREATED, 400, "student");
        const checkTeacherWithStudent = await studentService.isTeacherInClassroom(student.classRoom, teacherId);
        if (!checkTeacherWithStudent) throw new CustomError(errorStudentMessage.STUDENT_AND_TEACHER, 400, "teacher");
        const updatedStudent = await studentService.addComment(student._id, teacherId, comment, media);
        if (!updatedStudent) throw new CustomError(errorStudentMessage.DOES_NOT_UPDATED, 400, "student");
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: successStudentMessage.ADD_COMMENT,
            data: {
                student: updatedStudent,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- add progress history -----------------------------


const addProgressHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId, subjectId, status } = req.body;
        const student = await studentService.getStudentById(studentId);
        if (!student) throw new CustomError(errorStudentMessage.NOT_FOUND_STUDENT, 400, "student");
        const subjectExists = student.subjects?.some((subject: any) => subject.subjectId === subjectId);
        if (!subjectExists) throw new CustomError(errorStudentMessage.SUBJECT_NOT_EXISTING, 400, "subject");
        const progressStatus = await lookupService.getById(status);
        if (!progressStatus) throw new CustomError(errorStudentMessage.LOOKUPS_NOT_EXISTING, 400, "student");
        const progressHistoryStatus = await lookupService.getById(status);
        const updatedStudent = await studentService.addProgressHistory(studentId, subjectId, progressHistoryStatus.lookupName);
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: successStudentMessage.ADD_PROGRESS,
            data: {
                student: updatedStudent,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- add degree for subject -----------------------------


const addDegreeOfSubject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId, subjectId, degree } = req.body;
        const teacherId = req.user.userId;
        const degreeName = await lookupService.getById(degree);
        if (!degreeName) throw new CustomError(errorStudentMessage.LOOKUPS_NOT_EXISTING, 400, "student");
        const student = await studentService.getStudentById(studentId);
        if (!student) throw new CustomError(errorStudentMessage.DOES_NOT_CREATED, 400, "student");
        const checkTeacherWithStudent = await studentService.isTeacherInClassroom(student.classRoom, teacherId);
        if (!checkTeacherWithStudent) throw new CustomError(errorStudentMessage.STUDENT_AND_TEACHER, 400, "teacher");
        const subjectExists = student.subjects?.some((subject: any) => subject.subjectId === subjectId);
        if (!subjectExists) throw new CustomError(errorStudentMessage.SUBJECT_NOT_EXISTING, 400, "subject");
        const updatedStudent = await studentService.addDegree(studentId, subjectId, degreeName.lookupName);
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: successStudentMessage.ADD_DEGREE,
            data: {
                student: updatedStudent,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- get student data -----------------------------


const getStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId } = req.params;
        const { schoolId } = req.user;
        const student = await studentService.getStudentById(studentId);
        if (!student || student.schoolId !== schoolId) throw new CustomError(errorStudentMessage.NOT_FOUND_STUDENT, 404, "student");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successStudentMessage.GET_PROFILE,
            data: {
                student: student,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- get all students -----------------------------


const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { schoolId } = req.user;
        const students = await studentService.getStudents(schoolId);
        if (!students) throw new CustomError(errorStudentMessage.NOT_FOUND_STUDENT, 404, "student");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successStudentMessage.GET_PROFILE,
            data: {
                students: students,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- get all students of class room-----------------------------


const getStudentsOfClassRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const students = await classRoomService.getStudentsByTeacherId(userId);
        if (!students) throw new CustomError(errorStudentMessage.NOT_FOUND_STUDENT, 404, "student");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successStudentMessage.GET_PROFILE,
            data: {
                students: students.students,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- update student -----------------------------


const updateStudentData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentCode, studentName, classNumber, studentCost, currencyOfCost } = req.body;
        const IsStudentExisting = await studentService.getStudentByStudentCode(studentCode);
        if (!IsStudentExisting) throw new CustomError(errorStudentMessage.NOT_FOUND_STUDENT, 404, "student");
        const updatedStudent = await studentService.updateStudentData(IsStudentExisting._id, { studentName, classNumber, studentCost, currencyOfCost });
        if (!updatedStudent) throw new CustomError(errorSubjectMessage.NOT_UPDATED, 404, "student");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successStudentMessage.UPDATED,
            data: {
                student: updatedStudent,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- delete student -----------------------------


const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentCode, } = req.params;
        const IsStudentExisting = await studentService.getStudentByStudentCode(studentCode);
        if (!IsStudentExisting) throw new CustomError(errorStudentMessage.NOT_FOUND_STUDENT, 404, "student");
        const deletedStudent = await studentService.deleteStudent(IsStudentExisting._id);
        if (!deletedStudent) throw new CustomError(errorStudentMessage.DOES_NOT_DELETED, 409, "student");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successStudentMessage.UPDATED,
            data: {
                student: deletedStudent.studentCode,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};



export default {
    createStudent,
    addAttendance,
    addComment,
    addProgressHistory,
    addDegreeOfSubject,
    getStudent,
    getAllStudents,
    updateStudentData,
    deleteStudent,
    getStudentsOfClassRoom,
};