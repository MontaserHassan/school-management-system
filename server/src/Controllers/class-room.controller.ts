import { NextFunction, Request, Response } from "express";

import { classRoomService, lookupService, studentService, subjectService, topicService, userService } from "../Services/index.service";
import { errorClassRoomMessage, successClassRoomMessage } from "../Messages/index.message";
import CustomError from "../Utils/customError.util";
import pagination from "../Utils/pagination.util";
import IResponse from '../Interfaces/response.interface';
import { addTime } from "../helpers/calculate-endTime.helper";
import { ClassRoomModel } from "Models/class-room.model";



// ----------------------------- create subject room -----------------------------


const createClassRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { room, group, teachersId, schedule, studentCost, currencyOfCost, mainTopics } = req.body;
        const { schoolId } = req.user;
        const isRoomExisting = await classRoomService.getByRoom(room);
        if (isRoomExisting) throw new CustomError(errorClassRoomMessage.ROOM_ALREADY_TOKED, 400, "room");
        const teachers = await userService.getUserByIdAsTeacher(teachersId);
        const mainTopicsInfo = await topicService.getTopicsById(mainTopics);
        if (teachers.length !== teachersId.length) throw new CustomError('Some teachers do not exist.', 400, 'teachers');
        if (teachersId.length >= 1) {
            for (const teacher of teachersId) {
                const teacherClassRoom = await classRoomService.getByTeacherId(teacher);
                if (teacherClassRoom) throw new CustomError(errorClassRoomMessage.TEACHER_ALREADY_ASSIGNED, 400, "teacher");
            };
        };
        const teachersData = teachers.map(teacher => ({
            teacherId: teacher._id.toString(),
            teacherName: teacher.userName,
        }));
        const mainTopicsData = mainTopicsInfo.map(mainTopic => ({
            topicId: mainTopic._id,
            topicName: mainTopic.topicName,
        }));
        for (const entry of schedule) {
            const timeRanges = [];
            for (const subject of entry.subjects) {
                const subjectExists = await subjectService.getById(subject.subjectId);
                if (!subjectExists) throw new CustomError(`Subject ${subject.subjectId} does not exist.`, 400, 'subject');
                subject.endTime = addTime(subject.startTime, subjectExists.courseTime);
                subject.subjectName = subjectExists.subjectName;
                const subjectStartTime = new Date(`1970-01-01T${subject.startTime}:00Z`);
                const subjectEndTime = new Date(`1970-01-01T${subject.endTime}:00Z`);
                for (const { startTime, endTime } of timeRanges) {
                    if ((subjectStartTime >= startTime && subjectStartTime < endTime) || (subjectEndTime > startTime && subjectEndTime <= endTime) || (subjectStartTime <= startTime && subjectEndTime >= endTime)) {
                        throw new CustomError(`Subject time conflict: ${subject.subjectId} overlaps with another subject from ${startTime.toTimeString()} to ${endTime.toTimeString()}.`, 400, 'timeConflict');
                    };
                    if (subjectStartTime.getTime() === startTime.getTime()) {
                        throw new CustomError(`Subject time conflict: ${subject.subjectId} has the same start time as another subject (${subject.startTime}).`, 400, 'timeConflict');
                    };
                };
                timeRanges.push({ startTime: subjectStartTime, endTime: subjectEndTime });
            };
        };
        const groupData = await lookupService.getById(group);
        const currency = await lookupService.getById(currencyOfCost);
        const newClassRoom = await classRoomService.createClassRoom(room, groupData.lookupName, teachersData, schedule, studentCost, currency.lookupName, mainTopicsData, schoolId);
        if (!newClassRoom) throw new CustomError(errorClassRoomMessage.DOES_NOT_CREATED, 400, "none");
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: successClassRoomMessage.CREATED,
            data: {
                classRoom: newClassRoom,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- get class room -----------------------------


const getAllRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page } = req.query;
        const { schoolId, role, userId } = req.user;
        const rooms: ClassRoomModel[] = [];
        let paginateData;
        if (role === "teacher") {
            const teacherClassRoom = await classRoomService.getClassRoomByTeacherId(userId);
            if (!teacherClassRoom) throw new CustomError(errorClassRoomMessage.NOT_FOUND_CLASS, 404, "subject");
            rooms.push(teacherClassRoom);
        } else {
            const totalRooms = await classRoomService.totalDocument(schoolId);
            paginateData = pagination(totalRooms, Number(page));
            if (paginateData.status === 404) throw new CustomError(paginateData.message, paginateData.status, paginateData.path);
            const getRooms = await classRoomService.findWithPagination(schoolId, paginateData.limit, paginateData.skip);
            if (!rooms) throw new CustomError(errorClassRoomMessage.NOT_FOUND_CLASS, 404, "subject");
            rooms.push(...getRooms);
        };
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successClassRoomMessage.GET_ALL,
            data: {
                totalPages: paginateData ? paginateData.totalPages : 1,
                currentPage: paginateData ? paginateData.currentPage : 1,
                limit: paginateData ? paginateData.limit : 1,
                skip: paginateData ? paginateData.skip : 1,
                totalDocuments: paginateData ? paginateData.totalDocuments : 1,
                rooms: rooms,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- get class room -----------------------------


const getClassByRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { classRoom } = req.params;
        const classRoomData = await classRoomService.getByRoom(classRoom);
        if (!classRoomData) throw new CustomError(errorClassRoomMessage.NOT_FOUND_CLASS, 404, "room");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successClassRoomMessage.GET_CLASS_ROOM_DATA,
            data: {
                classRoom: classRoomData,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- get class room byId -----------------------------


const getClassById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { classRoom } = req.params;
        const { schoolId, userId } = req.user;
        const classRoomData = await classRoomService.getById(classRoom);
        if (!classRoomData) throw new CustomError(errorClassRoomMessage.NOT_FOUND_CLASS, 404, "room");
        if (classRoomData.schoolId !== schoolId) throw new CustomError(errorClassRoomMessage.ROOM_NOT_SCHOOL, 404, "school");
        // if (classRoomData.teachers.some(teacher => teacher.teacherId.toString() !== userId)) throw new CustomError(errorClassRoomMessage.NOT_TEACHER_AT_CLASS, 404, "teacher");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successClassRoomMessage.GET_CLASS_ROOM_DATA,
            data: {
                classRoom: classRoomData,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};



// ----------------------------- add student -----------------------------


const addStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { classRoom, students } = req.body;
        const classRoomData = await classRoomService.getByRoom(classRoom);
        if (!classRoomData) throw new CustomError(errorClassRoomMessage.NOT_FOUND_CLASS, 404, "room");
        const updateClassRoom = await classRoomService.addStudent(classRoom, students);
        if (!updateClassRoom) throw new CustomError(errorClassRoomMessage.STUDENT_NOT_ADDED, 400, "students");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successClassRoomMessage.GET_CLASS_ROOM_DATA,
            data: {
                classRoom: updateClassRoom,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- add teacher -----------------------------


const updateClassRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { schoolId } = req.user;
        const { room, teacherId, studentCost, currencyOfCost, schedule, group } = req.body;
        const classRoomData = await classRoomService.getById(room);
        if (!classRoomData || classRoomData.schoolId !== schoolId) throw new CustomError(errorClassRoomMessage.NOT_FOUND_CLASS, 404, "room");
        let updateClassRoom: ClassRoomModel;
        if (teacherId) {
            const teacher = await userService.getById(teacherId);
            if (!teacher) throw new CustomError(errorClassRoomMessage.TEACHER_NOT_FOUND, 404, "teacher");
            const teacherExists = await classRoomService.getByTeacherId(teacherId);
            if (classRoomData.teachers.some(teacher => teacher.teacherId.toString() === teacherId)) throw new CustomError(errorClassRoomMessage.TEACHER_ALREADY_AT_CLASS, 400, "teacher");
            if (teacherExists) throw new CustomError(errorClassRoomMessage.TEACHER_ALREADY_ASSIGNED, 400, "teacher");
            const newTeacher = { teacherId: String(teacher._id), teacherName: teacher.userName, };
            updateClassRoom = await classRoomService.addTeacher(classRoomData.room, newTeacher);
        };
        if (studentCost) {
            updateClassRoom = await classRoomService.updateRoom(classRoomData.room, { studentCost });
        };
        if (currencyOfCost) {
            updateClassRoom = await classRoomService.updateRoom(classRoomData.room, { currencyOfCost });
        };
        if (group) {
            updateClassRoom = await classRoomService.updateRoom(classRoomData.room, { group });
        };
        if (schedule) {
            for (const entry of schedule) {
                const timeRanges = [];
                for (const subject of entry.subjects) {
                    const subjectExists = await subjectService.getById(subject.subjectId);
                    if (!subjectExists) throw new CustomError(`Subject ${subject.subjectId} does not exist.`, 400, 'subject');
                    subject.endTime = addTime(subject.startTime, subjectExists.courseTime);
                    subject.subjectName = subjectExists.subjectName;
                    const subjectStartTime = new Date(`1970-01-01T${subject.startTime}:00Z`);
                    const subjectEndTime = new Date(`1970-01-01T${subject.endTime}:00Z`);
                    for (const { startTime, endTime } of timeRanges) {
                        if ((subjectStartTime >= startTime && subjectStartTime < endTime) || (subjectEndTime > startTime && subjectEndTime <= endTime) || (subjectStartTime <= startTime && subjectEndTime >= endTime)) {
                            throw new CustomError(`Subject time conflict: ${subject.subjectId} overlaps with another subject from ${startTime.toTimeString()} to ${endTime.toTimeString()}.`, 400, 'timeConflict');
                        };
                        if (subjectStartTime.getTime() === startTime.getTime()) throw new CustomError(`Subject time conflict: ${subject.subjectId} has the same start time as another subject (${subject.startTime}).`, 400, 'timeConflict');
                    };
                    timeRanges.push({ startTime: subjectStartTime, endTime: subjectEndTime });
                };
            };
            updateClassRoom = await classRoomService.updateScheduleDay(classRoomData.room, schedule);
        };
        if (!updateClassRoom) throw new CustomError(errorClassRoomMessage.DOES_NOT_UPDATED, 400, "class");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successClassRoomMessage.GET_CLASS_ROOM_DATA,
            data: {
                classRoom: updateClassRoom,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- delete subject room -----------------------------


const deleteClassRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { room } = req.params;
        const classRoom = await classRoomService.getById(room);
        if (!classRoom) throw new CustomError(errorClassRoomMessage.NOT_FOUND_CLASS, 404, "class room");
        const students = await studentService.getStudentsByClassRoom(classRoom.room);
        console.log('students: ', students);
        const updateStudent = students.map(student => { return studentService.updateStudentData(student._id, { classRoom: "", studentCost: '', currencyOfCost: '', group: '', subjects: [], mainTopics: [], attendance: [] }); });
        console.log('updateStudent: ', updateStudent);
        const xxx = await Promise.all(updateStudent);
        console.log('xxx: ', xxx);
        await classRoomService.deleteRoom(classRoom._id);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successClassRoomMessage.DELETED,
            data: {},
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};



export default {
    createClassRoom,
    addStudent,
    updateClassRoom,
    getAllRoom,
    getClassById,
    getClassByRoom,
    deleteClassRoom,
};