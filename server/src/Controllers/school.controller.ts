import { NextFunction, Request, Response } from "express";

import { schoolService, userService } from "../Services/index.service";
import { errorSchoolMessage, successSchoolMessage } from "../Messages/index.message";
import CustomError from "../Utils/customError.util";
import IResponse from '../Interfaces/response.interface';
import pagination from "../Utils/pagination.util";



// ----------------------------- create school -----------------------------


const createSchool = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { schoolName, subscriptionFees, subscriptionWay, subscriptionStatus, admins, employees } = req.body;
        const IsSchoolExisting = await schoolService.getSchoolByName(schoolName.toLowerCase());
        if (IsSchoolExisting) throw new CustomError(errorSchoolMessage.SCHOOL_ALREADY_EXISTS, 404, "school");
        const newSchool = await schoolService.createSchool(schoolName, subscriptionFees, subscriptionWay, subscriptionStatus, admins, employees,);
        if (!newSchool) throw new CustomError(errorSchoolMessage.DOES_NOT_CREATED, 409, "school");
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: successSchoolMessage.CREATED,
            data: {
                school: newSchool,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- add employee -----------------------------


const addEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { schoolId, adminId } = req.body;
        const school = await schoolService.getSchoolById(schoolId);
        if (!school) throw new CustomError(errorSchoolMessage.SCHOOL_NOT_FOUND, 404, "school");
        const addedEmployee = await schoolService.addAdmin(schoolId, adminId);
        if (!addedEmployee) throw new CustomError(errorSchoolMessage.DOES_NOT_ADDED, 409, "school");
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: successSchoolMessage.ADDED_SUCCESS,
            data: {
                school: addedEmployee,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- get school data -----------------------------


const getSchoolData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { schoolId } = req.params;
        const school = await schoolService.getSchoolById(schoolId);
        if (!school) throw new CustomError(errorSchoolMessage.SCHOOL_NOT_FOUND, 404, "school");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successSchoolMessage.GET_SCHOOL_DATA,
            data: {
                school: school,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- get all schools -----------------------------


const getAllSchools = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page } = req.query;
        const totalSchools = await schoolService.totalDocument();
        const paginateData = pagination(totalSchools, Number(page));
        if (paginateData.status === 404) throw new CustomError(paginateData.message, paginateData.status, paginateData.path);
        const schools = await schoolService.findWithPagination(paginateData.limit, paginateData.skip);
        if (!schools) throw new CustomError(errorSchoolMessage.NOT_FOUND_SCHOOL, 404, "school");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successSchoolMessage.GET_ALL_SCHOOLS,
            data: {
                totalPages: paginateData.totalPages,
                currentPage: paginateData.currentPage,
                limit: paginateData.limit,
                skip: paginateData.skip,
                schools: schools,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- update school -----------------------------


const updateSchool = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { schoolId, schoolName, subscriptionStatus, subscriptionWay, subscriptionFees, admins, employees } = req.body;
        const IsSchoolExisting = await schoolService.getSchoolById(schoolId);
        if (!IsSchoolExisting) throw new CustomError(errorSchoolMessage.SCHOOL_NOT_FOUND, 404, "school");
        const updatedSchool = await schoolService.updateSchoolData(schoolId, { schoolName, subscriptionStatus, subscriptionWay, subscriptionFees, });
        if (!updatedSchool) throw new CustomError(errorSchoolMessage.NOT_UPDATED, 404, "school");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successSchoolMessage.UPDATED,
            data: {
                student: updatedSchool,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- delete student -----------------------------


const deleteSchool = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { schoolId, } = req.params;
        const deletedSchool = await schoolService.deleteSchool(schoolId);
        const arrayOfUser = [...deletedSchool.employees, ...deletedSchool.admins]
        if (!deletedSchool) throw new CustomError(errorSchoolMessage.DOES_NOT_DELETED, 409, "student");
        await userService.deleteUsers(arrayOfUser);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successSchoolMessage.DELETED,
            data: {
                school: deletedSchool.schoolName,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};



export default {
    createSchool,
    addEmployee,
    getSchoolData,
    getAllSchools,
    updateSchool,
    deleteSchool,
};