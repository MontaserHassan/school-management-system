import { NextFunction, Request, Response } from "express";

import { classRoomService, lookupService, progressHistoryService, studentService, topicService } from "../Services/index.service";
import { errorClassRoomMessage, errorStudentMessage, errorSubjectMessage, errorTopicMessage, successStudentMessage, successSubjectMessage } from "../Messages/index.message";
import CustomError from "../Utils/customError.util";
import IResponse from '../Interfaces/response.interface';
import { StudentModel } from "../Models/student.model";
import pagination from "../Utils/pagination.util";



// ----------------------------- create student -----------------------------


const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { students } = req.body;
        const { schoolId } = req.user;
        const newStudents = await Promise.all(students.map(async (student: any) => {
            const { studentName, parentId, media } = student;
            const newStudent = await studentService.createStudent(studentName.toLowerCase(), parentId, schoolId, media);
            if (!newStudent) throw new CustomError(errorStudentMessage.DOES_NOT_CREATED, 400, "student");
            return newStudent;
        }));
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: successStudentMessage.CREATED,
            data: {
                students: newStudents,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- add student to class -----------------------------


const addStudentToClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { students, classRoom } = req.body;
        const { schoolId } = req.user;
        const isClassRoomExisting = await classRoomService.getByRoom(classRoom);
        if (!isClassRoomExisting || isClassRoomExisting.schoolId !== schoolId) throw new CustomError(errorClassRoomMessage.NOT_FOUND_ROOM, 400, "classRoom");
        const newStudents = await Promise.all(students.map(async (student: any) => {
            const { studentId } = student;
            const isStudentExisting = await studentService.getStudentById(studentId);
            if (!isStudentExisting || isStudentExisting.schoolId !== schoolId) throw new CustomError(errorStudentMessage.NOT_FOUND_STUDENT, 400, "student");
            const subjectsData = isClassRoomExisting.schedule ? isClassRoomExisting.schedule.flatMap(schedule => {
                return schedule.subjects.map(subject => ({ subjectId: subject.subjectId, subjectName: subject.subjectName }));
            }) : [];
            const mainTopicsData = isClassRoomExisting.mainTopics ? isClassRoomExisting.mainTopics.map(topic => {
                return { topicId: topic.topicId, topicName: topic.topicName };
            }) : [];
            const subjects = Array.from(new Map(subjectsData.map(sub => [sub.subjectId.toString(), sub])).values());
            const mainTopics = Array.from(new Map(mainTopicsData.map(topic => [topic.topicId.toString(), topic])).values());
            await studentService.addMoreDataToStudent(studentId, classRoom, isClassRoomExisting.group, subjects, mainTopics, isClassRoomExisting.studentCost, isClassRoomExisting.currencyOfCost);
            const updatedClassroom = await classRoomService.addStudent(classRoom, [{ studentId: (studentId).toString(), studentName: isStudentExisting.studentName }]);
            if (!updatedClassroom) throw new CustomError(errorClassRoomMessage.DOES_NOT_UPDATED, 400, "classRoom");
            return updatedClassroom;
        }));
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: successSubjectMessage.CREATED,
            data: {
                students: newStudents,
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
            updatedStudent = await studentService.addAttendance(student._id, attendanceStatus.lookupName, comment);
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
        // const checkTeacherWithStudent = await studentService.isTeacherInClassroom(student.classRoom, teacherId);
        // if (!checkTeacherWithStudent) throw new CustomError(errorStudentMessage.STUDENT_AND_TEACHER, 400, "teacher");
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


const addProgressStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId, subjectId, status } = req.body;
        const student = await studentService.getStudentById(studentId);
        if (!student) throw new CustomError(errorStudentMessage.NOT_FOUND_STUDENT, 400, "student");
        const subjectExists = student.subjects?.find((subject: any) => subject.subjectId === subjectId);
        if (!subjectExists) throw new CustomError(errorStudentMessage.SUBJECT_NOT_EXISTING, 400, "subject");
        const progressStatus = await lookupService.getById(status);
        if (!progressStatus) throw new CustomError(errorStudentMessage.LOOKUPS_NOT_EXISTING, 400, "student");
        const topicsWithoutDegree = student.mainTopics?.filter(topic => !topic.degree);
        if (progressStatus.lookupName === "Completed" && topicsWithoutDegree.length > 0) throw new CustomError(errorStudentMessage.TOPIC_WITHOUT_DEGREE, 400, "subject");
        const updatedStudent = await studentService.addProgressStatus(studentId, subjectId, progressStatus.lookupName);
        if (!updatedStudent) throw new CustomError(errorStudentMessage.DOES_NOT_UPDATED, 400, "student");
        const topics = await Promise.all(student.mainTopics.map(async (topic) => {
            const topicsForSubject = await topicService.getBySubjectId(subjectId);
            const filteredTopics = topicsForSubject.filter((t) => t._id === topic.topicId);
            return filteredTopics.map((filteredTopic) => ({
                topicId: filteredTopic._id,
                topicName: filteredTopic.topicName,
                degree: String(topic.degree),
            }));
        }));
        const flattedTopics = topics.flat();
        if (progressStatus.lookupName === "Completed") await progressHistoryService.createNewProgressHistory(studentId, subjectId, subjectExists.subjectName, flattedTopics, 'Completed', true)
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


// ----------------------------- add degree for topic -----------------------------


const addDegreeOfTopic = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId, topicId, degree } = req.body;
        const teacherId = req.user.userId;
        const degreeName = await lookupService.getById(degree);
        if (!degreeName) throw new CustomError(errorStudentMessage.LOOKUPS_NOT_EXISTING, 400, "student");
        const student = await studentService.getStudentById(studentId);
        if (!student) throw new CustomError(errorStudentMessage.DOES_NOT_CREATED, 400, "student");
        const checkTeacherWithStudent = await studentService.isTeacherInClassroom(student.classRoom, teacherId);
        if (!checkTeacherWithStudent) throw new CustomError(errorStudentMessage.STUDENT_AND_TEACHER, 400, "teacher");
        const topicExists = student.mainTopics?.some((topic: any) => topic.topicId === topicId);
        if (!topicExists) throw new CustomError(errorTopicMessage.TOPIC_NOT_FOUND, 400, "topic");
        const updatedStudent = await studentService.addDegree(studentId, topicId, degreeName.lookupName);
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


// ----------------------------- get progress history -----------------------------


const getProgressHistory = async (req: Request, res: Response, next: NextFunction) => {

};


// ----------------------------- get student data -----------------------------


const getStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId } = req.params;
        const { schoolId, role, userId } = req.user;
        let student = await studentService.getStudentById(studentId);
        if (!student || student.schoolId !== schoolId) throw new CustomError(errorStudentMessage.NOT_FOUND_STUDENT, 404, "student");
        const getClassRoom = await classRoomService.getByRoom(student.classRoom);
        if (role === "teacher") {
            const isTeacherInClass = getClassRoom.teachers.some(teacher => teacher.teacherId.toString() === userId);
            if (!isTeacherInClass) throw new CustomError(errorStudentMessage.STUDENT_AND_TEACHER, 400, "teacher");
        };
        const progressHistory = await progressHistoryService.getProgressHistoryPerStudent(studentId);
        student = { ...student.toObject(), progressHistory };
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
        const { page, limit } = req.query;
        const { schoolId, role, userId } = req.user;
        let paginateData: any;
        let students: StudentModel[];
        if (role === 'parent') {
            const totalStudents = await studentService.totalDocument(schoolId, userId);
            paginateData = pagination(totalStudents, Number(page), Number(limit));
            if (paginateData.status === 404) throw new CustomError(paginateData.message, paginateData.status, paginateData.path);
            students = await studentService.findAllStudentsOfSchool(schoolId, paginateData.limit, paginateData.skip, { key: 'parentId', value: userId });
        } else if (role === 'teacher') {
            const getClassRoomByTeacherId = await classRoomService.getClassRoomByTeacherId(userId);
            const totalStudents = await studentService.totalDocumentByClassRoom(schoolId, getClassRoomByTeacherId.room);
            paginateData = pagination(totalStudents, Number(page), Number(limit));
            if (paginateData.status === 404) throw new CustomError(paginateData.message, paginateData.status, paginateData.path);
            students = await studentService.findAllStudentsOfSchool(schoolId, paginateData.limit, paginateData.skip, { key: 'classRoom', value: getClassRoomByTeacherId.room });
        } else {
            const totalStudents = await studentService.totalDocument(schoolId);
            paginateData = pagination(totalStudents, Number(page), Number(limit));
            if (paginateData.status === 404) throw new CustomError(paginateData.message, paginateData.status, paginateData.path);
            students = await studentService.findAllStudentsOfSchool(schoolId, paginateData.limit, paginateData.skip);
        };
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successStudentMessage.GET_PROFILE,
            data: {
                totalPages: paginateData.totalPages,
                currentPage: paginateData.currentPage,
                limit: paginateData.limit,
                skip: paginateData.skip,
                totalDocuments: paginateData.totalDocuments,
                students: students,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- get all students of class room by teacher id-----------------------------


const getStudentsOfTeacher = async (req: Request, res: Response, next: NextFunction) => {
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


// ----------------------------- get all students of class room-----------------------------


const getStudentsByClassRoom = async (req: Request, res: Response, next: NextFunction) => {
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


// ----------------------------- get all students of class room -----------------------------


const getStudentsByParent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { schoolId } = req.user;
        const { parentId } = req.params;
        const students = await studentService.getStudentsByParentId(parentId, schoolId);
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
    addStudentToClass,
    addAttendance,
    addComment,
    addProgressStatus,
    addDegreeOfTopic,
    getProgressHistory,
    getStudent,
    getAllStudents,
    updateStudentData,
    getStudentsByParent,
    deleteStudent,
    getStudentsOfTeacher,
    getStudentsByClassRoom,
};