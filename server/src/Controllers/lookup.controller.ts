import { NextFunction, Request, Response } from "express";

import { classRoomService, lookupService, schoolService, studentService, domainService, topicService, userService } from "../Services/index.service";
import { errorLookupMessage, successLookupMessage } from "../Messages/index.message";
import CustomError from "../Utils/customError.util";
import IResponse from '../Interfaces/response.interface';



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
        const { existClassRoom } = req.query;
        const { parentId } = req.query;
        const { schoolId } = req.user;
        const targetData = lookups;
        let lookupsData;
        if (targetData === 'roles') {
            const lookups = await lookupService.getByMasterCodeAndParent('1');
            if (req.user.role === 'superAdmin') {
                lookupsData = lookups.filter(item => item.lookupName === 'admin').map(item => ({ _id: item._id, value: item.lookupName }));
            } else if (req.user.role === 'admin' || req.user.role === 'director') {
                lookupsData = lookups.filter(item => item.lookupName !== 'superAdmin' && item.lookupName !== 'admin' && item.lookupName !== 'parent').map(item => ({ _id: item._id, value: item.lookupName }));
            } else {
                throw new CustomError(errorLookupMessage.UNAUTHORIZED_ACCESS_LOOKUPS, 403, 'lookup');
            };
        } else if (targetData === 'students') {
            let lookups;
            if (existClassRoom && existClassRoom === 'true') {
                lookups = await studentService.getAllStudentsLookups(schoolId, true);
            } else if (parentId) {
                lookups = await studentService.getStudentsByParentId(String(parentId), schoolId);
            } else {
                lookups = await studentService.getAllStudentsLookups(schoolId, false);
            };
            lookupsData = lookups.map(item => { return { _id: item._id, value: item.studentName } });
        } else if (targetData === 'domains') {
            const lookups = await domainService.getAllDomainsLookups(schoolId);
            lookupsData = lookups.map(item => { return { _id: item._id, value: item.domainName } });
        } else if (targetData === 'topics') {
            const lookups = await topicService.getAllTopicsLookups(schoolId);
            lookupsData = lookups.map(item => { return { _id: item._id, value: item.topicName } });
        } else if (targetData === 'schools') {
            const lookups = await schoolService.getAllSchools();
            lookupsData = lookups.map(item => { return { _id: item._id, value: item.schoolName } });
        } else if (targetData === 'classRooms') {
            const lookups = await classRoomService.getAllClassRoomLookups(schoolId);
            lookupsData = lookups.map(item => { return { _id: item._id, value: item.room } });
        } else if (targetData === 'groups') {
            const lookups = await lookupService.getByMasterCodeAndParent('2');
            lookupsData = lookups.map(item => { return { _id: item._id, value: item.lookupName } });
        } else if (targetData === 'progress') {
            const lookups = await lookupService.getByMasterCodeAndParent('3');
            lookupsData = lookups.map(item => { return { _id: item._id, value: item.lookupName } });
        } else if (targetData === 'degree') {
            const lookups = await lookupService.getByMasterCodeAndParent('4');
            lookupsData = lookups.map(item => { return { _id: item._id, value: item.lookupName } });
        } else if (targetData === 'attendanceStatus') {
            const lookups = await lookupService.getByMasterCodeAndParent('5');
            lookupsData = lookups.map(item => { return { _id: item._id, value: item.lookupName } });
        } else if (targetData === 'currency') {
            const lookups = await lookupService.getByMasterCodeAndParent('6');
            lookupsData = lookups.map(item => { return { _id: item._id, value: item.lookupName } });
        } else if (targetData === 'subscriptionStatus') {
            const lookups = await lookupService.getByMasterCodeAndParent('7');
            lookupsData = lookups.map(item => { return { _id: item._id, value: item.lookupName } });
        } else if (targetData === 'allUsers') {
            const lookups = await userService.findAllUserOfSchoolLookup(String(schoolId));
            lookupsData = lookups.filter(item => item._id !== req.user.userId).map(item => { return { _id: item._id, value: item.userName } });
            if (req.user.role === 'admin') {
                const superAdmin = await userService.findUserByRole(String("superAdmin"));
                lookupsData.push({ _id: superAdmin[0]._id, value: superAdmin[0].userName });
            }
            if (req.user.role === 'superAdmin') {
                const lookups = await userService.findUserByRole(String("admin"));
                lookupsData = lookups.map(item => { return { _id: item._id, value: item.userName } });
            }
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
        const { role } = req.query;
        const { schoolId } = req.user;
        let lookupsData;
        if (schoolId === "superAdmin") {
            const lookups = await userService.findUserByRole(String("admin"));
            lookupsData = lookups.map(item => { return { _id: item._id, value: item.userName } });
        } else if (schoolId !== "superAdmin" && req.user.role === 'admin' && !role) {
            const lookups = await userService.findAllUserOfSchoolLookup(String(schoolId));
            lookupsData = lookups.map(item => { return { _id: item._id, value: item.userName } });
        } else if (role && schoolId !== "superAdmin") {
            if (role !== 'superAdmin') {
                const lookups = await userService.findSpecificUserOfSchool(String(role), String(schoolId));
                lookupsData = lookups.map(item => { return { _id: item._id, value: item.userName } });
            } else {
                const lookups = await userService.findUserByRole(String("superAdmin"));
                lookupsData = lookups.map(item => { return { _id: item._id, value: item.userName } });
            }
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