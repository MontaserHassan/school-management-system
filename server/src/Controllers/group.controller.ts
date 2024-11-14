import { NextFunction, Request, Response } from "express";

import IResponse from '../Interfaces/response.interface';
import { groupService } from '../Services/index.service';
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
            responseMessage: 'group',
            data: {
                group: newGroup,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- get groups -----------------------------


const getGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groups = await groupService.findAllGroups(req.user.schoolId);
        if (!groups) throw new CustomError(errorGroupMessage.NOT_FOUND_GROUP, 404, "group");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: 'group',
            data: {
                groups: groups,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- get notification -----------------------------


const getGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { groupId } = req.params;
        const group = await groupService.findGroupById(groupId);
        if (!group) throw new CustomError(errorGroupMessage.NOT_FOUND_GROUP, 404, "group");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: 'group',
            data: {
                group: group,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};



export default {
    createGroup,
    getGroups,
    getGroup,
};