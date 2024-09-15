import { NextFunction, Request, Response } from "express";

import { classRoomService, lookupService, subjectService, topicService, userService } from "../Services/index.service";
import { errorClassRoomMessage, successClassRoomMessage } from "../Messages/index.message";
import CustomError from "../Utils/customError.util";
import pagination from "../Utils/pagination.util";
import IResponse from '../Interfaces/response.interface';
import { addTime } from "../helpers/calculate-endTime.helper";



// ----------------------------- create subject room -----------------------------


const createClassRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { room, group, teachersId, schedule, studentCost, mainTopics } = req.body;
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
        console.log('mainTopicsInfo: ', mainTopicsInfo);
        const mainTopicsData = mainTopicsInfo.map(mainTopic => ({
            topicId: mainTopic._id,
            topicName: mainTopic.topicName,
        }));
        console.log('mainTopicsData: ', mainTopicsData);
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
        const newClassRoom = await classRoomService.createClassRoom(room, groupData.lookupName, teachersData, schedule, studentCost, mainTopicsData, schoolId);
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
        const totalSubjectRooms = await classRoomService.totalDocument();
        const paginateData = pagination(totalSubjectRooms, Number(page));
        if (paginateData.status === 404) throw new CustomError(paginateData.message, paginateData.status, paginateData.path);
        const subjectRooms = await classRoomService.findWithPagination(paginateData.limit, paginateData.skip);
        if (!subjectRooms) throw new CustomError(errorClassRoomMessage.NOT_FOUND_CLASS, 404, "subject");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successClassRoomMessage.GET_ALL,
            data: {
                totalPages: paginateData.totalPages,
                currentPage: paginateData.currentPage,
                limit: paginateData.limit,
                skip: paginateData.skip,
                subjectRooms: subjectRooms,
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
        console.log('classRoom: ', classRoom);
        const classRoomData = await classRoomService.getById(classRoom);
        console.log('classRoomData: ', classRoomData);
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

// ----------------------------- delete subject room -----------------------------


const deleteClassRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { room } = req.params;
        await classRoomService.deleteRoom(room);
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
    getAllRoom,
    getClassByRoom,
    getClassById,
    deleteClassRoom,
};