import { NextFunction, Request, Response } from "express";

import { studentDegreeService } from "../Services/index.service";
import { successStudentDegreeMessage, errorStudentDegreeMessage } from "../Messages/index.message";
import CustomError from "../Utils/customError.util";
import IResponse from '../Interfaces/response.interface';
import generatePDFReport from "../Utils/create-PDF.util";



// ----------------------------- add new student record -----------------------------


const createStudentDegree = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.subject.teacherId = req.employee.employeeId;
        const { studentCode, classNumber, subject } = req.body;
        const newRecord = await studentDegreeService.createStudentRecord(studentCode, classNumber, subject);
        if (!newRecord) throw new CustomError(errorStudentDegreeMessage.DOES_NOT_CREATED, 400, "none");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successStudentDegreeMessage.CREATED,
            data: {
                newRecord: newRecord,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- get all student records -----------------------------


const getAllStudentDegree = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentCode } = req.params;
        const allStudentRecords = await studentDegreeService.getAllStudentRecords(studentCode);
        if (!allStudentRecords) throw new CustomError(errorStudentDegreeMessage.DOES_NOT_FOUND, 404, "studentCode");
        const pdfReport = generatePDFReport(res, allStudentRecords);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successStudentDegreeMessage.GET_ALL,
            data: {
                studentRecords: allStudentRecords,
                pdfReport: pdfReport
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- get student record by class -----------------------------


const getStudentDegreeByClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentCode, classNumber } = req.params;
        const studentRecord = await studentDegreeService.getDegreesByStudentCodeAndClass(studentCode, classNumber);
        if (!studentRecord) throw new CustomError(errorStudentDegreeMessage.DOES_NOT_FOUND, 404, "studentCode-classNumber");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successStudentDegreeMessage.GET_ALL,
            data: {
                studentRecord: studentRecord,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- update student record -----------------------------


const updateStudentDegree = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentCode, classNumber, updateData } = req.body;
        const updatedRecord = await studentDegreeService.updateStudentRecord(studentCode, classNumber, updateData);
        if (!updatedRecord) throw new CustomError(errorStudentDegreeMessage.DOES_NOT_UPDATED, 404, "studentCode-classNumber");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successStudentDegreeMessage.UPDATED,
            data: {
                studentRecord: updatedRecord,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};




export default {
    createStudentDegree,
    getAllStudentDegree,
    getStudentDegreeByClass,
    updateStudentDegree,
};