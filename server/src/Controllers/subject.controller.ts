import { NextFunction, Request, Response } from "express";

import { subjectService } from "../Services/index.service";
import { errorSubjectMessage, successSubjectMessage } from "../Messages/index.message";
import CustomError from "../Utils/customError.util";
import IResponse from '../Interfaces/response.interface';
import pagination from '../Utils/pagination.util';



// ----------------------------- create subject -----------------------------


const createSubject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { subjectName, courseTime } = req.body;
        const { schoolId } = req.user;
        const isSubjectExisting = await subjectService.getByName((subjectName).toLowerCase(), schoolId);
        if (isSubjectExisting) throw new CustomError(errorSubjectMessage.EXISTING_SUBJECT, 400, "subject");
        const newSubject = await subjectService.createSubject((subjectName).toLowerCase(), courseTime, schoolId);
        if (!newSubject) throw new CustomError(errorSubjectMessage.DOES_NOT_CREATED, 400, "none");
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: successSubjectMessage.CREATED,
            data: {
                subject: newSubject,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- get subject data -----------------------------


const getSubjectData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { subjectId } = req.params;
        const subject = await subjectService.getById(subjectId);
        if (!subject) throw new CustomError(errorSubjectMessage.NOT_FOUND_SUBJECT, 404, "subject");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successSubjectMessage.GET_SUBJECT_DATA,
            data: {
                subject: subject,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- get all subjects -----------------------------


const getAllSubject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page } = req.query;
        const { schoolId } = req.user;
        const totalSubjects = await subjectService.totalDocument(schoolId);
        const paginateData = pagination(totalSubjects, Number(page));
        if (paginateData.status === 404) throw new CustomError(paginateData.message, paginateData.status, paginateData.path);
        const subjects = await subjectService.findWithPagination(schoolId, paginateData.limit, paginateData.skip);
        if (!subjects) throw new CustomError(errorSubjectMessage.NOT_FOUND_SUBJECT, 404, "subject");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successSubjectMessage.GET_SUBJECT_DATA,
            data: {
                totalPages: paginateData.totalPages,
                currentPage: paginateData.currentPage,
                limit: paginateData.limit,
                skip: paginateData.skip,
                totalDocuments: paginateData.totalDocuments,
                subject: subjects,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};

// ----------------------------- update subject data -----------------------------


const updateSubjectData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { subjectId, subjectName, courseTime } = req.body;
        const isSubjectExisting = await subjectService.getById(subjectId);
        const newSubjectName = !subjectName ? isSubjectExisting.subjectName : (subjectName).toLowerCase();
        const newCourseTime = !courseTime ? isSubjectExisting.courseTime : courseTime
        if (!isSubjectExisting) throw new CustomError(errorSubjectMessage.NOT_FOUND_SUBJECT, 404, "subject");
        const subject = await subjectService.updateById(subjectId, { subjectName: newSubjectName, courseTime: newCourseTime });
        if (!subject) throw new CustomError(errorSubjectMessage.NOT_UPDATED, 404, "subject");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successSubjectMessage.CREATED,
            data: {
                subject: subject,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- delete subject -----------------------------


const deleteSubject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { subjectId } = req.params;
        await subjectService.deleteSubject(subjectId);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successSubjectMessage.DELETED,
            data: {},
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};



export default {
    createSubject,
    getSubjectData,
    getAllSubject,
    updateSubjectData,
    deleteSubject,
};