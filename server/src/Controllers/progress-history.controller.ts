import { NextFunction, Request, Response } from "express";

import { progressHistoryService, } from "../Services/index.service";
import { successProgressHistoryMessage, } from "../Messages/index.message";
import IResponse from '../Interfaces/response.interface';



// ----------------------------- get degree data -----------------------------


const getStudentProgressHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId } = req.params;
        const progressHistory = await progressHistoryService.getProgressHistoryPerStudent(studentId);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successProgressHistoryMessage.GET_PROGRESS_HISTORY,
            data: {
                progressHistory: progressHistory,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};



export default {
    getStudentProgressHistory,
};