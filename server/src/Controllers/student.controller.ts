import { NextFunction, Request, Response } from "express";

import { classRoomService, studentService, subjectService } from "../Services/index.service";
import { errorClassRoomMessage, errorStudentMessage, errorSubjectMessage, successStudentMessage, successSubjectMessage } from "../Messages/index.message";
import CustomError from "../Utils/customError.util";
import IResponse from '../Interfaces/response.interface';



// ----------------------------- create student -----------------------------


const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentName, classRoom } = req.body;
        const { schoolId } = req.user;
        const isClassRoomExisting = await classRoomService.getByRoom(classRoom);
        if (!isClassRoomExisting) throw new CustomError(errorClassRoomMessage.NOT_FOUND_ROOM, 400, "classRoom");
        const subjectsData = isClassRoomExisting.schedule ? isClassRoomExisting.schedule.flatMap(schedule => {
            return schedule.subjects.map(subject => ({ subjectId: subject.subjectId, subjectName: subject.subjectName }));
        }) : [];
        const mainTopics = isClassRoomExisting.mainTopics ? isClassRoomExisting.mainTopics.map(topic => { return { topicId: topic.topicId, topicName: topic.topicName } }) : [];
        const studentCost = isClassRoomExisting.studentCost;
        const currencyOfCost = isClassRoomExisting.currencyOfCost;
        const group = isClassRoomExisting.group;
        const subjects = Array.from(new Map(subjectsData.map(sub => [sub.subjectId.toString(), sub])).values());
        const newStudent = await studentService.createStudent(studentName.toLowerCase(), group, classRoom, subjects, mainTopics, studentCost, currencyOfCost, schoolId);
        if (!newStudent) throw new CustomError(errorStudentMessage.DOES_NOT_CREATED, 400, "student");
        // const isStudentAlreadyInClass = isClassRoomExisting.students.some(student => student.studentId === newStudent._id);
        // if (isStudentAlreadyInClass) {
        //     await studentService.deleteStudent(newStudent._id);
        //     throw new CustomError(errorStudentMessage.EXISTING_STUDENT, 400, "student");
        // };
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
        const { studentCode, teacherId, status, comment } = req.body;
        const student = await studentService.getStudentByStudentCode(studentCode);
        if (!student) throw new CustomError(errorStudentMessage.DOES_NOT_CREATED, 400, "student");
        // const subject = await subjectService.getById(subjectId);
        // if (!subject) throw new CustomError(errorSubjectMessage.NOT_FOUND_SUBJECT, 400, "subject");
        const updatedStudent = await studentService.addAttendance(studentCode._id, teacherId, status, comment);
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: successSubjectMessage.CREATED,
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
        const { studentCode, teacherId, comment, media } = req.body;
        const student = await studentService.getStudentByStudentCode(studentCode);
        if (!student) throw new CustomError(errorStudentMessage.DOES_NOT_CREATED, 400, "student");
        const updatedStudent = await studentService.addComment(studentCode._id, teacherId, comment, media);
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: successSubjectMessage.CREATED,
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
        const { studentCode, subjectId, completed } = req.body;
        const student = await studentService.getStudentByStudentCode(studentCode);
        if (!student) throw new CustomError(errorStudentMessage.DOES_NOT_CREATED, 400, "student");
        const updatedStudent = await studentService.addProgressHistory(studentCode._id, subjectId, completed);
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: successSubjectMessage.CREATED,
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
        const { studentCode } = req.params;
        const student = await studentService.getStudentByStudentCode(studentCode);
        if (!student) throw new CustomError(errorStudentMessage.NOT_FOUND_STUDENT, 404, "student");
        const subjects = student.subjects.map(subject => ({
            subjectName: subject.subjectId["subjectName"],
        }));
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successStudentMessage.GET_PROFILE,
            data: {
                student: student,
                subjects: subjects
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
    getStudent,
    updateStudentData,
    deleteStudent,
};