import { NextFunction, Request, Response } from "express";

import { lookupService, studentService, subjectService, userService } from "../Services/index.service";
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
        const lookupInfo = lookups.split('/')
        const targetData = lookupInfo[0];
        let lookupsData;
        if (targetData === 'roles') {
            lookupsData = await lookupService.getByMasterCodeAndParent('1');
        } else if (targetData === 'teachers') {
            lookupsData = await userService.getTeachers();
        } else if (targetData === 'students') {
            lookupsData = await studentService.getAllStudents();
        } else if (targetData === 'subjects') {
            lookupsData = await subjectService.getAllSubjects();
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
    updateLookup,
    deleteLookup,
};