import { NextFunction, Request, Response } from "express";

import { classRoomService, studentService, skillService, activityService } from "../Services/index.service";
import { errorActivityMessage, successActivityMessage, errorClassRoomMessage, errorSkillMessage } from "../Messages/index.message";
import CustomError from "../Utils/customError.util";
import IResponse from '../Interfaces/response.interface';
import pagination from '../Utils/pagination.util';



// ----------------------------- create activity -----------------------------


const createActivity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { activityName, materialName, skillId, room } = req.body;
        const { schoolId } = req.user;
        const isSkillExisting = await skillService.getById(skillId);
        if (!isSkillExisting) throw new CustomError(errorSkillMessage.NOT_FOUND_SKILL, 404, "skill");
        const isRoomExisting = await classRoomService.getByRoomAndSchoolId(room, schoolId);
        if (!isRoomExisting) throw new CustomError(errorClassRoomMessage.NOT_FOUND_ROOM, 404, "room");
        const isOperationTrue = isRoomExisting.teachers.some(teacher => teacher.teacherId.toString() === req.user.userId);
        if (!isOperationTrue) throw new CustomError(errorClassRoomMessage.NOT_TEACHER_AT_CLASS, 400, "teacher");
        const skillsLength = await activityService.getLengthActivities(isSkillExisting._id);
        const newActivityId = skillsLength + 1;
        const newActivity = await activityService.createActivity(`s${newActivityId}`, activityName.toLowerCase(), materialName.toLowerCase(), isSkillExisting._id, isSkillExisting.skillName, room, isSkillExisting.domainId, isSkillExisting.domainName, schoolId);
        if (!newActivity) throw new CustomError(errorActivityMessage.DOES_NOT_CREATED, 400, "none");
        const addActivityToRoom = await classRoomService.addActivity(room, { activityId: newActivity._id, activityName: newActivity.activityName, materialName: newActivity.materialName });
        if (!addActivityToRoom) throw new CustomError(errorClassRoomMessage.SKILLS_NOT_ADDED, 400, "none");
        await Promise.all(addActivityToRoom.students.map(async (student) => { return await studentService.addActivity(student.studentId, isSkillExisting._id, newActivity._id, newActivity.activityName, newActivity.materialName,) }));
        await skillService.addNewActivity(skillId, newActivity._id, newActivity.activityName, newActivity.materialName);
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: successActivityMessage.CREATED,
            data: {
                activity: newActivity,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- get activity data -----------------------------


const getActivityData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { activityId } = req.params;
        const activity = await activityService.getById(activityId);
        if (!activity) throw new CustomError(errorActivityMessage.NOT_FOUND_ACTIVITY, 404, "activity");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successActivityMessage.GET_ACTIVITY_DATA,
            data: {
                activity: activity,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- get all activities -----------------------------


const getAllActivities = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page, limit } = req.query;
        const { schoolId } = req.user;
        const totalSkill = await activityService.totalDocument(schoolId);
        const paginateData = pagination(totalSkill, Number(page), Number(limit));
        if (paginateData.status === 404) throw new CustomError(paginateData.message, paginateData.status, paginateData.path);
        const activities = await activityService.findWithPagination(schoolId, paginateData.limit, paginateData.skip);
        if (!activities) throw new CustomError(errorActivityMessage.NOT_FOUND_ACTIVITY, 404, "activity");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successActivityMessage.GET_ALL_ACTIVITIES_DATA,
            data: {
                totalPages: paginateData.totalPages,
                currentPage: paginateData.currentPage,
                limit: paginateData.limit,
                skip: paginateData.skip,
                totalDocuments: paginateData.totalDocuments,
                activities: activities,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};

// ----------------------------- update activity data -----------------------------


const updateActivityData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { activityId, activityName, materialName } = req.body;
        const isActivityExisting = await activityService.getById(activityId);
        if (!isActivityExisting) throw new CustomError(errorActivityMessage.NOT_FOUND_ACTIVITY, 404, "activity");
        const newActivityName = !activityName ? isActivityExisting.activityName : (activityName).toLowerCase();
        const newMaterialName = !materialName ? isActivityExisting.materialName : (materialName).toLowerCase();
        const activity = await activityService.updateById(activityId, { activityName: newActivityName, materialName: newMaterialName });
        if (!activity) throw new CustomError(errorActivityMessage.NOT_UPDATED, 404, "activity");
        await studentService.updateActivityDataInStudents(isActivityExisting._id, newActivityName, newMaterialName);
        await classRoomService.updateActivityDataInClassrooms(isActivityExisting._id, newActivityName, newMaterialName);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successActivityMessage.UPDATED,
            data: {
                activity: activity,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- delete activity -----------------------------


const deleteActivity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { activityId } = req.params;
        await activityService.deleteActivity(activityId);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successActivityMessage.DELETED,
            data: {},
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};



export default {
    createActivity,
    getActivityData,
    getAllActivities,
    updateActivityData,
    deleteActivity,
};