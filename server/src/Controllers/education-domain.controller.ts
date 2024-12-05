import { NextFunction, Request, Response } from "express";

import { cycleService, domainService, educationDomainService, schoolService } from "../Services/index.service";
import { errorEducationDomainMessage, successEducationDomainMessage, errorSchoolMessage, errorCycleMessage, errorDomainMessage } from "../Messages/index.message";
import { CustomError } from "../Utils/index.util";
import IResponse from '../Interfaces/response.interface';



// ----------------------------- create education domain -----------------------------


const createEducationDomain = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { educationDomainName, educationDomainDescription, domains, cycleId, schoolId } = req.body;
        const isSchoolExisting = await schoolService.getSchoolById(schoolId);
        if (!isSchoolExisting) throw new CustomError(errorSchoolMessage.SCHOOL_NOT_FOUND, 404, "school");
        const isCycleExisting = await cycleService.getCycleByCycleId(cycleId);
        if (!isCycleExisting) throw new CustomError(errorCycleMessage.CYCLE_NOT_FOUND, 404, "cycle");
        const processedDomains = await Promise.all(
            domains.map(async (domain) => {
                const existingDomain = await domainService.getById(domain);
                if (!existingDomain || existingDomain.schoolId !== schoolId) throw new CustomError(errorDomainMessage.NOT_FOUND_DOMAIN, 404, "educationDomain");
                return { domainId: existingDomain.id, domainName: existingDomain.domainName, };
            }),
        );
        const newEducationDomain = await educationDomainService.createDomain(schoolId, cycleId, isCycleExisting.cycleName, educationDomainName, educationDomainDescription, processedDomains);
        await Promise.all(domains.map(domain => domainService.updateById(domain, { educationDomainId: newEducationDomain })));
        await cycleService.addEducationDomainToCycle(isCycleExisting._id, { educationDomainId: newEducationDomain._id, educationDomainName: newEducationDomain.educationDomainName, educationDomainDescription: newEducationDomain.educationDomainDescription });
        if (!newEducationDomain) throw new CustomError(errorEducationDomainMessage.DOES_NOT_CREATED, 400, "none");
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: successEducationDomainMessage.CREATED,
            data: {
                educationDomain: newEducationDomain,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- get education domain data -----------------------------


const getEducationDomainData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { educationDomainId } = req.params;
        const educationDomain = await educationDomainService.getById(educationDomainId);
        if (!educationDomain) throw new CustomError(errorEducationDomainMessage.NOT_FOUND_DOMAIN, 404, "educationDomain");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successEducationDomainMessage.GET_EDUCATION_DOMAIN_DATA,
            data: {
                educationDomain: educationDomain,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- get all domains -----------------------------


const getAllEducationDomain = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const educationDomains = await educationDomainService.getAll();
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successEducationDomainMessage.GET_EDUCATION_DOMAINS_DATA,
            data: {
                educationDomains: educationDomains,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- update domain data -----------------------------


const updateEducationDomainData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { educationDomainId, educationDomainName, educationDomainDescription, domains } = req.body;
        const isEducationDomainExisting = await educationDomainService.getById(educationDomainId);
        if (!isEducationDomainExisting) throw new CustomError(errorEducationDomainMessage.NOT_FOUND_DOMAIN, 404, "educationDomain");
        let processedDomains;
        if (domains) {
            processedDomains = await Promise.all(
                domains.map(async (domain) => {
                    const existingDomain = await domainService.getById(domain);
                    if (!existingDomain) throw new CustomError(errorDomainMessage.NOT_FOUND_DOMAIN, 404, "domain");
                    return { domainId: existingDomain.id, domainName: existingDomain.domainName, };
                }),
            );
        };
        const newDomains = domains ? processedDomains : isEducationDomainExisting.domains;
        const newEducationDomainName = educationDomainName ? educationDomainName : isEducationDomainExisting.educationDomainName;
        const newEducationDomainDescription = educationDomainDescription ? educationDomainDescription : isEducationDomainExisting.educationDomainDescription;
        const updateEducationDomain = await educationDomainService.updateById(educationDomainId, { domains: newDomains, educationDomainName: newEducationDomainName, educationDomainDescription: newEducationDomainDescription });
        if (!updateEducationDomain) throw new CustomError(errorEducationDomainMessage.NOT_UPDATED, 404, "educationDomain");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successEducationDomainMessage.CREATED,
            data: {
                updateEducationDomain: updateEducationDomain,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- delete domain -----------------------------


const deleteEducationDomain = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { educationDomainId } = req.params;
        await educationDomainService.deleteDomain(educationDomainId);
        await domainService.updateByEducationDomainId(educationDomainId);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successEducationDomainMessage.DELETED,
            data: {},
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};



export default {
    createEducationDomain,
    getEducationDomainData,
    getAllEducationDomain,
    updateEducationDomainData,
    deleteEducationDomain,
};