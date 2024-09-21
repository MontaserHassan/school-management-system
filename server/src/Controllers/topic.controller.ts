import { NextFunction, Request, Response } from "express";

import { classRoomService, studentService, topicService } from "../Services/index.service";
import { errorClassRoomMessage, errorTopicMessage, successTopicMessage } from "../Messages/index.message";
import CustomError from "../Utils/customError.util";
import IResponse from '../Interfaces/response.interface';
import pagination from '../Utils/pagination.util';



// ----------------------------- create topic -----------------------------


const createTopic = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { topicName, room } = req.body;
        const { schoolId } = req.user;
        const isRoomExisting = await classRoomService.getByRoom(room);
        if (!isRoomExisting) throw new CustomError(errorClassRoomMessage.NOT_FOUND_ROOM, 404, "room");
        const isOperationTrue = isRoomExisting.teachers.some(teacher => teacher.teacherId.toString() === req.user.userId);
        if (!isOperationTrue) throw new CustomError(errorClassRoomMessage.NOT_TEACHER_AT_CLASS, 400, "teacher");
        let newTopic = await topicService.getByName(topicName.toLowerCase());
        if (newTopic) {
            const isTopicExistingInRoom = isRoomExisting.mainTopics.some(topic => topic.topicName === topicName);
            if (isTopicExistingInRoom) throw new CustomError(errorClassRoomMessage.TOPIC_EXISTING_IN_ROOM, 400, "topic");
        } else {
            newTopic = await topicService.createTopic(topicName.toLowerCase(), schoolId);
            if (!newTopic) throw new CustomError(errorTopicMessage.DOES_NOT_CREATED, 400, "none");
        };
        const addTopicToRoom = await classRoomService.addTopic(room, { topicId: newTopic._id, topicName: newTopic.topicName });
        if (!addTopicToRoom) throw new CustomError(errorClassRoomMessage.TOPIC_NOT_ADDED, 400, "none");
        addTopicToRoom.students.map(async (student) => await studentService.addTopic(student.studentId, newTopic._id));
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: successTopicMessage.CREATED,
            data: {
                topic: newTopic,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- get topic data -----------------------------


const getTopicData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { topicId } = req.params;
        const topic = await topicService.getById(topicId);
        if (!topic) throw new CustomError(errorTopicMessage.NOT_FOUND_TOPIC, 404, "topic");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successTopicMessage.GET_TOPIC_DATA,
            data: {
                topic: topic,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- get all topics -----------------------------


const getAllTopics = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page } = req.query;
        const { schoolId } = req.user;
        const totalTopics = await topicService.totalDocument();
        const paginateData = pagination(totalTopics, Number(page));
        if (paginateData.status === 404) throw new CustomError(paginateData.message, paginateData.status, paginateData.path);
        const topics = await topicService.findWithPagination(schoolId, paginateData.limit, paginateData.skip);
        if (!topics) throw new CustomError(errorTopicMessage.NOT_FOUND_TOPIC, 404, "topic");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successTopicMessage.GET_TOPIC_DATA,
            data: {
                totalPages: paginateData.totalPages,
                currentPage: paginateData.currentPage,
                limit: paginateData.limit,
                skip: paginateData.skip,
                totalDocuments: paginateData.totalDocuments,
                topics: topics,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};

// ----------------------------- update topic data -----------------------------


const updateTopicData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { topicId, topicName } = req.body;
        const isTopicExisting = await topicService.getById(topicId);
        const newTopicName = !topicName ? isTopicExisting.topicName : (topicName).toLowerCase();
        if (!isTopicExisting) throw new CustomError(errorTopicMessage.NOT_FOUND_TOPIC, 404, "topic");
        const topic = await topicService.updateById(topicId, { topicName: newTopicName });
        if (!topic) throw new CustomError(errorTopicMessage.NOT_UPDATED, 404, "topic");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successTopicMessage.CREATED,
            data: {
                topic: topic,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- delete topic -----------------------------


const deleteTopic = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { topicId } = req.params;
        await topicService.deleteTopic(topicId);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successTopicMessage.DELETED,
            data: {},
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};



export default {
    createTopic,
    getTopicData,
    getAllTopics,
    updateTopicData,
    deleteTopic,
};