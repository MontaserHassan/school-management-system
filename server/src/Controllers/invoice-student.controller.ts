import { NextFunction, Request, Response } from "express";
import fs from 'fs';
import path from 'path';

import { studentInvoiceService, schoolService, userService, studentService, } from "../Services/index.service";
import IResponse from '../Interfaces/response.interface';
import { CustomError, sendEmail, pagination } from "../Utils/index.util";
import { errorInvoiceMessage, errorSchoolMessage, errorStudentMessage, ErrorUserMessage, successInvoiceMessage } from "../Messages/index.message";
import { StudentInvoiceModel } from "../Models/invoices-student.model";



// ----------------------------- create invoice -----------------------------


const createInvoice = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { parentId, studentId, amount, media } = req.body;
        const { schoolId } = req.user;
        const isSchoolExisting = await schoolService.getSchoolById(schoolId);
        if (!isSchoolExisting) throw new CustomError(errorSchoolMessage.SCHOOL_NOT_FOUND, 404, "school");
        const adminInfo = await userService.getById(isSchoolExisting.admin)
        const parentInfo = await userService.getById(parentId);
        if (!parentInfo) throw new CustomError(ErrorUserMessage.PARENT_NOT_FOUND, 404, "parent");
        const studentInfo = await studentService.getStudentById(studentId);
        if (!studentInfo || schoolId !== studentInfo.schoolId) throw new CustomError(errorStudentMessage.NOT_FOUND_STUDENT, 404, "student");
        if (!studentInfo.remainingAmount || Number(amount) > Number(studentInfo.remainingAmount)) throw new CustomError(errorInvoiceMessage.INSUFFICIENT_AMOUNT, 400, "amount");
        const invoice = await studentInvoiceService.createInvoice(schoolId, adminInfo.email, amount, { parentId: String(parentInfo._id), parentName: parentInfo.userName }, { studentId: studentInfo._id, studentName: studentInfo.studentName, }, media);
        await studentService.updateStudentData(studentInfo._id, { remainingAmount: Number(studentInfo.remainingAmount) - Number(amount), pendingAmount: Number(amount), });
        const subject = 'New Invoice';
        const content = fs.readFileSync(path.resolve(__dirname, '../../src/Templates/invoice.html'), 'utf8');
        sendEmail(parentInfo.email, subject, content);
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
        const { schoolId, role, userId } = req.user;
        const { limit, page } = req.query;
        let invoices: StudentInvoiceModel[];
        let paginateData;
        if (role === 'parent') {
            const invoicesCounts = await studentInvoiceService.totalDocument(schoolId, userId);
            paginateData = pagination(invoicesCounts, Number(page), Number(limit));
            invoices = await studentInvoiceService.findInvoicesByParentId(userId, paginateData.limit, paginateData.skip);
        } else {
            const invoicesCounts = await studentInvoiceService.totalDocument(schoolId);
            paginateData = pagination(invoicesCounts, Number(page), Number(limit));
            invoices = await studentInvoiceService.findInvoices(schoolId, paginateData.limit, paginateData.skip);
        };
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
        const invoice = await studentInvoiceService.findInvoiceById(invoiceId);
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
        const invoice = await studentInvoiceService.updateInvoice(invoiceId, { media });
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