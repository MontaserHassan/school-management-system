import { NextFunction, Request, Response } from "express";

import IResponse from '../Interfaces/response.interface';
import { classRoomService, groupService } from '../Services/index.service';
import { errorGroupMessage, successGroupMessage } from "../Messages/index.message";
import { CustomError } from "../Utils/index.util";



// ----------------------------- create group -----------------------------


const createGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { groupName } = req.body;
        const newGroup = await groupService.createGroup(groupName, req.user.schoolId);
        if (!newGroup) throw new CustomError(errorGroupMessage.NOT_FOUND_GROUP, 404, "group");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successGroupMessage.CREATED,
            data: {
                group: newGroup,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- get groups -----------------------------


const getGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groups = await groupService.findAllGroups();
        if (!groups) throw new CustomError(errorGroupMessage.NOT_FOUND_GROUP, 404, "group");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successGroupMessage.GET_GROUPS,
            data: {
                groups: groups,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- get group -----------------------------


const getGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { groupId } = req.params;
        const group = await groupService.findGroupById(groupId);
        if (!group) throw new CustomError(errorGroupMessage.NOT_FOUND_GROUP, 404, "group");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successGroupMessage.GET_GROUP,
            data: {
                group: group,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- get classes by group -----------------------------


const getClasses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { groupId } = req.params;
        const isGroupExisting = await groupService.findGroupById(groupId);
        if (!isGroupExisting) throw new CustomError(errorGroupMessage.NOT_FOUND_GROUP, 404, "group");
        const classes = await classRoomService.getClassesByGroup(req.user.schoolId, isGroupExisting.groupName);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successGroupMessage.GET_CLASSES_BY_GROUP,
            data: {
                classes: classes,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};



export default {
    createGroup,
    getGroups,
    getGroup,
    getClasses,
};