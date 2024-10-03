import { NextFunction, Request, Response } from "express";

import { invoiceService, schoolService, userService, } from "../Services/index.service";
import IResponse from '../Interfaces/response.interface';
import CustomError from "../Utils/customError.util";
import { errorInvoiceMessage, errorSchoolMessage, successInvoiceMessage } from "../Messages/index.message";
import { InvoiceModel } from "Models/invoices.model";
import pagination from "../Utils/pagination.util";



// ----------------------------- create invoice -----------------------------


const createInvoice = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { schoolId, media } = req.body;
        const isSchoolExisting = await schoolService.getSchoolById(schoolId);
        if (!isSchoolExisting) throw new CustomError(errorSchoolMessage.SCHOOL_NOT_FOUND, 404, "school");
        const userInfo = await userService.getById(isSchoolExisting.admin);
        const invoice = await invoiceService.createInvoice(isSchoolExisting._id, { adminId: String(userInfo._id), adminName: userInfo.userName }, media);
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
        let invoices: InvoiceModel[];
        let paginateData;
        if (role === 'superAdmin') {
            const invoicesCounts = await invoiceService.totalDocument();
            paginateData = pagination(invoicesCounts, Number(page), Number(limit));
            invoices = await invoiceService.findInvoices(paginateData.limit, paginateData.skip);
        } else {
            const invoicesCounts = await invoiceService.totalDocument(schoolId);
            paginateData = pagination(invoicesCounts, Number(page), Number(limit));
            invoices = await invoiceService.findInvoicesBySchoolId(schoolId, paginateData.limit, paginateData.skip);
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
        const invoice = await invoiceService.findInvoiceById(invoiceId);
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
        const invoice = await invoiceService.updateInvoice(invoiceId, { media });
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