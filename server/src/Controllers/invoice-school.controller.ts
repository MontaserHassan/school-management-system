import { NextFunction, Request, Response } from "express";
import fs from 'fs';
import path from 'path';

import { schoolsInvoiceService, schoolService, userService, } from "../Services/index.service";
import IResponse from '../Interfaces/response.interface';
import { errorInvoiceMessage, errorSchoolMessage, successInvoiceMessage } from "../Messages/index.message";
import { SchoolInvoiceModel } from "Models/invoices-school.model";
import { CustomError, sendEmail, pagination } from "../Utils/index.util";



// ----------------------------- create invoice -----------------------------


const createInvoice = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { schoolId, media } = req.body;
        const isSchoolExisting = await schoolService.getSchoolById(schoolId);
        if (!isSchoolExisting) throw new CustomError(errorSchoolMessage.SCHOOL_NOT_FOUND, 404, "school");
        const superAdminInfo = await userService.getSuperAdminData();
        const userInfo = await userService.getById(isSchoolExisting.admin);
        const invoice = await schoolsInvoiceService.createInvoice(Number(isSchoolExisting.subscriptionFees), superAdminInfo.email, { schoolId: isSchoolExisting._id, schoolName: isSchoolExisting.schoolName }, { adminId: String(userInfo._id), adminName: userInfo.userName }, media);
        const subject = 'New Invoice';
        const content = fs.readFileSync(path.resolve(__dirname, '../../src/Templates/invoice.html'), 'utf8');
        sendEmail(userInfo.email, subject, content);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successInvoiceMessage.CREATED,
            data: {
                invoice: invoice,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- get invoices -----------------------------


const getInvoices = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { schoolId, role } = req.user;
        const { limit, page } = req.query;
        let invoices: SchoolInvoiceModel[];
        let paginateData;
        if (role === 'superAdmin') {
            const invoicesCounts = await schoolsInvoiceService.totalDocument();
            paginateData = pagination(invoicesCounts, Number(page), Number(limit));
            invoices = await schoolsInvoiceService.findInvoices(paginateData.limit, paginateData.skip);
        } else {
            const invoicesCounts = await schoolsInvoiceService.totalDocument(schoolId);
            paginateData = pagination(invoicesCounts, Number(page), Number(limit));
            invoices = await schoolsInvoiceService.findInvoicesBySchoolId(schoolId, paginateData.limit, paginateData.skip);
        };
        if (!invoices) throw new CustomError(errorInvoiceMessage.NOT_FOUND_INVOICE, 404, "invoice");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successInvoiceMessage.FETCHED,
            data: {
                totalPages: paginateData ? paginateData.totalPages : 1,
                currentPage: paginateData ? paginateData.currentPage : 1,
                limit: paginateData ? paginateData.limit : 1,
                skip: paginateData ? paginateData.skip : 1,
                totalDocuments: paginateData ? paginateData.totalDocuments : 1,
                invoices: invoices,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- get invoice -----------------------------


const getInvoice = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { invoiceId } = req.params;
        const invoice = await schoolsInvoiceService.findInvoiceById(invoiceId);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successInvoiceMessage.FETCHED_BY_ID,
            data: {
                invoice: invoice,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};



// ----------------------------- update invoice -----------------------------


const updateInvoice = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { invoiceId, media } = req.body;
        const invoice = await schoolsInvoiceService.updateInvoice(invoiceId, { media });
        if (!invoice) throw new CustomError(errorInvoiceMessage.NOT_FOUND_INVOICE, 404, "invoice");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successInvoiceMessage.FETCHED_BY_ID,
            data: {
                invoice: invoice,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


export default {
    createInvoice,
    getInvoices,
    getInvoice,
    updateInvoice,
};