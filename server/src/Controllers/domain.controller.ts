import { NextFunction, Request, Response } from "express";

import { domainService, educationDomainService, groupService, notificationService, schoolService, userService } from "../Services/index.service";
import { errorDomainMessage, successDomainMessage, errorGroupMessage } from "../Messages/index.message";
import CustomError from "../Utils/customError.util";
import IResponse from '../Interfaces/response.interface';
import pagination from '../Utils/pagination.util';



// ----------------------------- create domain -----------------------------


const createDomain = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { domainName, courseTime, groupId } = req.body;
        const { schoolId } = req.user;
        const isGroupExisting = await groupService.findGroupById(groupId,);
        if (!isGroupExisting) throw new CustomError(errorGroupMessage.NOT_FOUND_GROUP, 404, "group");
        const isDomainExisting = await domainService.getByName((domainName).toLowerCase(), schoolId, isGroupExisting.groupName);
        if (isDomainExisting) throw new CustomError(errorDomainMessage.EXISTING_DOMAIN, 400, "domain");
        const domainsLength = await domainService.getLengthDomainsForSchool(schoolId, isGroupExisting.groupName);
        const newDomainId = domainsLength + 1;
        const newDomain = await domainService.createDomain(`d${newDomainId}`, (domainName).toLowerCase(), courseTime, isGroupExisting.groupName, schoolId);
        if (!newDomain) throw new CustomError(errorDomainMessage.DOES_NOT_CREATED, 400, "none");
        await schoolService.updateSchoolData(schoolId, { verify: false, notifySuperAdmin: true });
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: successDomainMessage.CREATED,
            data: {
                domain: newDomain,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);;
    };
};


// ----------------------------- get domain data -----------------------------


const getDomainData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { domainId } = req.params;
        const domain = await domainService.getById(domainId);
        if (!domain) throw new CustomError(errorDomainMessage.NOT_FOUND_DOMAIN, 404, "domain");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successDomainMessage.GET_DOMAIN_DATA,
            data: {
                domain: domain,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- get all domains -----------------------------


const getAllDomain = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page, limit } = req.query;
        const { schoolId } = req.user;
        const totalDomains = await domainService.totalDocument(schoolId);
        const paginateData = pagination(totalDomains, Number(page), Number(limit));
        if (paginateData.status === 404) throw new CustomError(paginateData.message, paginateData.status, paginateData.path);
        const domains = await domainService.findWithPagination(schoolId, paginateData.limit, paginateData.skip);
        if (!domains) throw new CustomError(errorDomainMessage.NOT_FOUND_DOMAIN, 404, "domain");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successDomainMessage.GET_DOMAIN_DATA,
            data: {
                totalPages: paginateData.totalPages,
                currentPage: paginateData.currentPage,
                limit: paginateData.limit,
                skip: paginateData.skip,
                totalDocuments: paginateData.totalDocuments,
                domains: domains,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- update domain data -----------------------------


const updateDomainData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { schoolId } = req.user;
        const { domainId, domainName, courseTime } = req.body;
        const isDomainExisting = await domainService.getById(domainId);
        if (!isDomainExisting) throw new CustomError(errorDomainMessage.NOT_FOUND_DOMAIN, 404, "domain");
        const newDomainName = !domainName ? isDomainExisting.domainName : (domainName).toLowerCase();
        const newCourseTime = !courseTime ? isDomainExisting.courseTime : courseTime
        const domain = await domainService.updateById(domainId, { domainName: newDomainName, courseTime: newCourseTime, });
        if (!domain) throw new CustomError(errorDomainMessage.NOT_UPDATED, 404, "domain");
        const schoolData = await schoolService.updateSchoolData(schoolId, { verify: false, notifySuperAdmin: true, });
        if (isDomainExisting.educationDomainId) {
            const updatedEducationDomain = await educationDomainService.updateDomainsById(isDomainExisting.educationDomainId, domainId, { domainName: domain.domainName, isChanged: true });
            await educationDomainService.updateById(updatedEducationDomain._id, { isChanged: true });
            const superAdminData = await userService.getSuperAdminData();
            await notificationService.createNotification(superAdminData._id.toString(), 'superAdmin', "Domain updated", `Hi Super Admin, School: ${schoolData.schoolName} has a domain that has been updated in the system, so please check school cycles to verify this school.`);
        };
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successDomainMessage.UPDATED,
            data: {
                domain: domain,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- delete domain -----------------------------


const deleteDomain = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { domainId } = req.params;
        await domainService.deleteDomain(domainId);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successDomainMessage.DELETED,
            data: {},
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};



export default {
    createDomain,
    getDomainData,
    getAllDomain,
    updateDomainData,
    deleteDomain,
};