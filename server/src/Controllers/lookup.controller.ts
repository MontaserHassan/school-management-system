import { NextFunction, Request, Response } from "express";

import { classRoomService, lookupService, schoolService, studentService, subjectService, topicService, userService } from "../Services/index.service";
import { errorLookupMessage, successLookupMessage } from "../Messages/index.message";
import CustomError from "../Utils/customError.util";
import IResponse from '../Interfaces/response.interface';
import pagination from "../Utils/pagination.util";



// ----------------------------- create lookup details -----------------------------


const createLookupsDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { masterCode, lookups } = req.body;
        if (!lookups || !Array.isArray(lookups)) throw new CustomError(errorLookupMessage.DOES_NOT_CREATED, 400, "Lookups");
        const updatedLookups = lookups.map(lookup => {
            lookup._id = `SchoolSystem-${masterCode}-${!lookup.parentCode ? `${lookup.lookupCode}` : `${lookup.parentCode}-${lookup.lookupCode}`}`
            lookup.masterCode = masterCode;
            return lookup;
        });
        const newLookups = await lookupService.createLookupDetails(updatedLookups);
        if (!newLookups) throw new CustomError(errorLookupMessage.DOES_NOT_CREATED, 400, "Lookups");
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: successLookupMessage.CREATED,
            data: {
                lookups: newLookups,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- get lookups -----------------------------


const getLookups = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { lookups } = req.params;
        // const { page } = req.query;
        const targetData = lookups;
        let lookupsData;
        if (targetData === 'roles') {
            const lookups = await lookupService.getByMasterCodeAndParent('1');
            if (req.user.role === 'superAdmin') {
                lookupsData = lookups.filter(item => item.lookupName === 'admin').map(item => ({ id: item._id, value: item.lookupName }));
            } else if (req.user.role === 'admin' || req.user.role === 'director') {
                lookupsData = lookups.filter(item => item.lookupName !== 'superAdmin' && item.lookupName !== 'admin').map(item => ({ _id: item._id, value: item.lookupName }));
            } else {
                throw new CustomError(errorLookupMessage.UNAUTHORIZED_ACCESS_LOOKUPS, 403, 'lookup');
            };
        } else if (targetData === 'students') {
            // const totalStudents = await studentService.totalDocument();
            // const paginateData = pagination(totalStudents, Number(page));
            // const lookups = await studentService.findAllStudentsOfSchool(paginateData.limit, paginateData.skip);
            const lookups = await studentService.getAllStudents();
            lookupsData = lookups.map(item => { return { _id: item._id, value: item.studentName } });
        } else if (targetData === 'subjects') {
            // const totalSubjects = await subjectService.totalDocument();
            // const paginateData = pagination(totalSubjects, Number(page));
            // const lookups = await subjectService.findWithPagination(paginateData.limit, paginateData.skip);
            const lookups = await subjectService.getAllSubjects();
            lookupsData = lookups.map(item => { return { _id: item._id, value: item.subjectName } });
        } else if (targetData === 'topics') {
            // const totalTopics = await topicService.totalDocument();
            // const paginateData = pagination(totalTopics, Number(page));
            // const lookups = await topicService.findWithPagination(paginateData.limit, paginateData.skip);
            const lookups = await topicService.find();
            lookupsData = lookups.map(item => { return { _id: item._id, value: item.topicName } });
        } else if (targetData === 'schools') {
            // const totalSchools = await schoolService.totalDocument();
            // const paginateData = pagination(totalSchools, Number(page));
            // const lookups = await schoolService.findWithPagination(paginateData.limit, paginateData.skip);
            const lookups = await schoolService.getAllSchools();
            lookupsData = lookups.map(item => { return { _id: item._id, value: item.schoolName } });
        } else if (targetData === 'groups') {
            // const totalSchools = await schoolService.totalDocument();
            // const paginateData = pagination(totalSchools, Number(page));
            // const lookups = await schoolService.findWithPagination(paginateData.limit, paginateData.skip);
            const lookups = await lookupService.getByMasterCodeAndParent('2');
            lookupsData = lookups.map(item => { return { _id: item._id, value: item.lookupName } });
        } else if (targetData === 'classRooms') {
            // const totalSchools = await schoolService.totalDocument();
            // const paginateData = pagination(totalSchools, Number(page));
            // const lookups = await schoolService.findWithPagination(paginateData.limit, paginateData.skip);
            const lookups = await classRoomService.find();
            lookupsData = lookups.map(item => { return { _id: item._id, value: item.room } });
        } else {
            throw new CustomError(errorLookupMessage.NOT_FOUND_LOOKUP, 404, "lookup");
        };
        if (!lookupsData) throw new CustomError(errorLookupMessage.NOT_FOUND_LOOKUP, 404, "lookup");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successLookupMessage.GET_LOOKUPS,
            data: {
                lookups: lookupsData,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- get users lookups -----------------------------


const getUsersBySpecificData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { role, page } = req.query;
        const { schoolId } = req.user;
        let lookupsData;
        if (schoolId === "superAdmin") {
            const totalUsers = await userService.totalDocument("role", String("admin"));
            const paginateData = pagination(totalUsers, Number(page));
            const lookups = await userService.findUserByRole(paginateData.limit, paginateData.skip, String("admin"));
            lookupsData = lookups.map(item => { return { _id: item._id, value: item.userName } });
        } else if (schoolId !== "superAdmin" && req.user.role === 'admin' && !role) {
            const totalUsers = await userService.totalDocument("role", String(role));
            const paginateData = pagination(totalUsers, Number(page));
            const lookups = await userService.findAllUserOfSchool(paginateData.limit, paginateData.skip, String(schoolId));
            lookupsData = lookups.map(item => { return { _id: item._id, value: item.userName } });
        } else if (role && schoolId !== "superAdmin") {
            const totalUsers = await userService.totalDocument("role", String(role));
            const paginateData = pagination(totalUsers, Number(page));
            const lookups = await userService.findSpecificUserOfSchool(paginateData.limit, paginateData.skip, String(role), String(schoolId));
            lookupsData = lookups.map(item => { return { _id: item._id, value: item.userName } });
        };
        if (!lookupsData) throw new CustomError(errorLookupMessage.NOT_FOUND_LOOKUP, 404, "lookup");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successLookupMessage.GET_LOOKUPS,
            data: {
                lookups: lookupsData,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- update lookup data -----------------------------


const updateLookup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { lookupCode, lookupName } = req.body;
        const lookup = await lookupService.updateLookupCode(lookupCode, { lookupName: lookupName });
        if (!lookup) throw new CustomError(errorLookupMessage.NOT_UPDATED, 404, "lookup");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successLookupMessage.UPDATED,
            data: {
                lookup: lookup,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- delete lookup -----------------------------


const deleteLookup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { lookupCode } = req.params;
        await lookupService.deleteLookupCode(lookupCode);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successLookupMessage.DELETED,
            data: {},
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};



export default {
    createLookupsDetails,
    getLookups,
    getUsersBySpecificData,
    updateLookup,
    deleteLookup,
};