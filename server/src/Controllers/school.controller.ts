import { NextFunction, Request, Response } from "express";
import fs from 'fs';
import path from 'path';

import { lookupService, schoolService, userService } from "../Services/index.service";
import { errorLookupMessage, errorSchoolMessage, successSchoolMessage } from "../Messages/index.message";
import IResponse from '../Interfaces/response.interface';
import { SubscriptionSchoolModel } from "../Models/school.model";
import { CSVSchool, CustomError, calculateSubscriptionDate, sendEmail, pagination } from "../Utils/index.util";
import { UserModel } from "Models/user.model";



// ----------------------------- create school -----------------------------


const createSchool = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { schoolName, subscriptionFees, subscriptionWay, subscriptionStatus, admin, employees, currencyOfSubscription } = req.body;
        const IsSchoolExisting = await schoolService.getSchoolByName(schoolName.toLowerCase());
        if (IsSchoolExisting) throw new CustomError(errorSchoolMessage.SCHOOL_ALREADY_EXISTS, 404, "school");
        let adminUser: UserModel | null = await userService.getUserByEmail(admin.email);
        const currency = await lookupService.getById(currencyOfSubscription);
        if (!currency) throw new CustomError(errorLookupMessage.NOT_FOUND_LOOKUP, 404, "currency");
        if (!adminUser) {
            adminUser = await userService.createUser(admin.userName, admin.email, 'admin', null, '');
            const subject = 'New Account';
            const content = fs.readFileSync(path.resolve(__dirname, '../../src/Templates/activate-account.html'), 'utf8');
            sendEmail(adminUser.email, subject, content);
        };
        const newSchool = await schoolService.createSchool(schoolName.toLowerCase(), subscriptionFees, currency.lookupName, subscriptionWay, subscriptionStatus, String(adminUser._id), employees,);
        if (!newSchool) throw new CustomError(errorSchoolMessage.DOES_NOT_CREATED, 409, "school");
        await userService.updateUser(String(adminUser._id), { schoolId: String(newSchool._id) });
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


// ----------------------------- get school data -----------------------------


const getSchoolData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { isExport } = req.query;
        const { schoolId } = req.params;
        const { userId, role } = req.user;
        const school = await schoolService.getSchoolById(schoolId);
        if (!school) throw new CustomError(errorSchoolMessage.SCHOOL_NOT_FOUND, 404, "school");
        if (role === 'admin' && String(school.admin) !== userId) throw new CustomError(errorSchoolMessage.SCHOOL_NOT_FOUND, 404, "school");
        const admin = await userService.getById(school.admin);
        const transformedSchool = {
            ...school.toObject(),
            admin: {
                userName: admin.userName,
                email: admin.email,
                _id: admin._id
            },
        };
        let base64String: string;
        if (isExport === 'true') {
            const schools = [];
            schools.push(transformedSchool);
            base64String = await CSVSchool(schools);
        };
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successSchoolMessage.GET_SCHOOL_DATA,
            data: {
                school: transformedSchool,
                base64String: base64String ? base64String : '',
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
        const { page, limit, isExport } = req.query;
        const totalSchools = await schoolService.totalDocument();
        const paginateData = pagination(totalSchools, Number(page), Number(limit));
        if (paginateData.status === 404) throw new CustomError(paginateData.message, paginateData.status, paginateData.path);
        let schools = await schoolService.findWithPagination(paginateData.limit, paginateData.skip);
        if (!schools) throw new CustomError(errorSchoolMessage.NOT_FOUND_SCHOOL, 404, "school");
        const schoolsData = await Promise.all(schools.map(async (school) => {
            const admin = await userService.getById(school.admin);
            return {
                ...school.toObject(),
                admin: {
                    userName: admin.userName,
                    email: admin.email,
                    _id: admin._id
                },
            };
        }));
        let base64String: string;
        if (isExport === 'true') {
            base64String = await CSVSchool(schoolsData);
        };
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successSchoolMessage.GET_ALL_SCHOOLS,
            data: {
                totalPages: paginateData.totalPages,
                currentPage: paginateData.currentPage,
                limit: paginateData.limit,
                skip: paginateData.skip,
                totalDocuments: paginateData.totalDocuments,
                schools: schoolsData,
                base64String: base64String ? base64String : '',
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
        const { schoolId, schoolName, subscriptionStatus, subscriptionWay, subscriptionFees, currencyOfSubscription } = req.body;
        const IsSchoolExisting = await schoolService.getSchoolById(schoolId);
        if (!IsSchoolExisting) throw new CustomError(errorSchoolMessage.SCHOOL_NOT_FOUND, 404, "school");
        let updatedSchool: SubscriptionSchoolModel;
        let updatedData: {};
        let newSubscriptionStatus: string;
        let currency: string;
        if (subscriptionStatus) {
            const subscriptionStatusName = await lookupService.getById(subscriptionStatus)
            newSubscriptionStatus = subscriptionStatus ? subscriptionStatusName.lookupName : IsSchoolExisting.subscriptionStatus;
        };
        if (currencyOfSubscription) {
            const currencyName = await lookupService.getById(currencyOfSubscription)
            currency = currencyOfSubscription ? currencyName.lookupName : IsSchoolExisting.currencyOfSubscription;
        };
        const newSchoolName = schoolName ? schoolName : IsSchoolExisting.schoolName;
        const newSubscriptionWay = subscriptionWay ? subscriptionWay : IsSchoolExisting.subscriptionWay;
        const newSubscriptionFees = subscriptionFees ? subscriptionFees : IsSchoolExisting.subscriptionFees;
        if (subscriptionWay || subscriptionStatus) {
            const subscriptionDate = new Date();
            const endOfSubscription = calculateSubscriptionDate(newSubscriptionWay, subscriptionDate);
            updatedData = { subscriptionDate: subscriptionDate, subscriptionWay: newSubscriptionWay, endOfSubscription: endOfSubscription, subscriptionStatus: newSubscriptionStatus };
        };
        updatedSchool = await schoolService.updateSchoolData(schoolId, { schoolName: newSchoolName, currencyOfSubscription: currency, subscriptionFees: newSubscriptionFees, ...updatedData });
        if (!updatedSchool) throw new CustomError(errorSchoolMessage.NOT_UPDATED, 404, "school");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successSchoolMessage.UPDATED,
            data: {
                school: updatedSchool,
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
        const arrayOfUser = [...deletedSchool.employees, deletedSchool.admin]
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
    getSchoolData,
    getAllSchools,
    updateSchool,
    deleteSchool,
};