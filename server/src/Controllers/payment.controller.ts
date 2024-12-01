import { NextFunction, Request, Response } from "express";

import { paymentService, schoolService, schoolsInvoiceService, studentInvoiceService, studentService, userTokenService } from "../Services/index.service";
import { calculateSubscriptionDate, CustomError } from "../Utils/index.util";
import IResponse from '../Interfaces/response.interface';
import { errorInvoiceMessage } from "../Messages/index.message";



// ----------------------------- create payment -----------------------------


const createPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, role, schoolId } = req.user;
        const { invoiceId } = req.body;
        const paymentData = {
            name: "",
            amount: 0,
            currency: "",
            service: 1,
            serviceName: "",
        };
        let isInvoiceExisting;
        let studentId;
        if (role === "admin") {
            isInvoiceExisting = await schoolsInvoiceService.findInvoiceById(invoiceId);
            if (!isInvoiceExisting || isInvoiceExisting.invoiceStatus === "paid") throw new CustomError(errorInvoiceMessage.NOT_FOUND_INVOICE, 404, 'invoice');
            const schoolData = await schoolService.getSchoolById(schoolId);
            paymentData.name = `Renew School Subscription: ${schoolData.schoolName}`;
            paymentData.amount = Number(isInvoiceExisting.amount);
            paymentData.currency = schoolData.currencyOfSubscription;
            paymentData.service = 1;
            paymentData.serviceName = "Subscription Of School";
        } else if (role === "parent") {
            isInvoiceExisting = await studentInvoiceService.findInvoiceById(invoiceId);
            if (!isInvoiceExisting) throw new CustomError(errorInvoiceMessage.NOT_FOUND_INVOICE, 404, 'invoice');
            studentId = isInvoiceExisting.student.studentId;
            const studentData = await studentService.getStudentById(studentId);
            paymentData.name = `Student Costs: ${studentData.studentName}`;
            paymentData.amount = Number(isInvoiceExisting.amount);
            paymentData.currency = studentData.currencyOfCost;
            paymentData.service = 2;
            paymentData.serviceName = "Costs Of Student";
        };
        const createPayment = await paymentService.createPayment(paymentData.name, paymentData.amount, paymentData.currency);
        if (!createPayment) throw new CustomError('Payment not created', 400, 'payment');
        const newPayment = await paymentService.savePaymentTransaction(req.user.schoolId, invoiceId, userId, createPayment.id, paymentData.name, paymentData.amount, paymentData.currency, paymentData.service, paymentData.serviceName, studentId);
        if (!newPayment) throw new CustomError('Payment not saved', 400, 'payment');
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: 'Payment created successfully',
            data: {
                payment: createPayment,
                paymentTransaction: newPayment,
                redirectURL: createPayment.url,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- get payment -----------------------------


const getPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const getPayment = await paymentService.retrievePayment(id);
        if (!getPayment) throw new CustomError('Payment not found', 404, 'payment');
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: 'Payment retrieved successfully',
            data: {
                payment: getPayment,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- complete payment -----------------------------


const completePayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { session_id } = req.query;
        const payment = await paymentService.getPayment(String(session_id));
        let invoice;
        if (payment.service === 1) {
            const schoolData = await schoolService.getSchoolById(payment.schoolId);
            const newSubscriptionDate = new Date();
            const endOfSubscription = calculateSubscriptionDate(schoolData.subscriptionWay, newSubscriptionDate);
            await schoolService.updateSchoolData(schoolData._id, { endOfSubscription: endOfSubscription, subscriptionStatus: "paid", subscriptionDate: newSubscriptionDate });
            invoice = await schoolsInvoiceService.updateInvoice(payment.invoiceId, { invoiceStatus: "paid", PaidDate: new Date() });
        };
        if (payment.service === 2) {
            const student = await studentService.getStudentById(payment.studentId);
            const paymentStatus = student.remainingAmount === 0 ? "paid" : "pending";
            await studentService.updateStudentData(payment.studentId, { paymentStatus: paymentStatus, paidAmount: Number(student.paidAmount) + Number(payment.amount), pendingAmount: 0 });
            invoice = await studentInvoiceService.updateInvoice(payment.invoiceId, { invoiceStatus: "paid", PaidDate: new Date() });
        };
        await paymentService.updatePayment(payment._id, { status: "Completed", PaidDate: new Date() });
        const user = await userTokenService.getToken(payment.userId);
        const token = user.token;
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: 'Payment completed successfully',
            data: {
                payment: payment,
            },
        };
        res.data = response;
        return res.redirect(`http://127.0.0.1:5500/server/payment/payment-success.html?token=${token}&isSuccess=true`);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- cancel payment -----------------------------


const cancelPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { session_id } = req.query;
        const payment = await paymentService.getPayment(String(session_id));
        await paymentService.updatePayment(payment._id, { status: "Canceled", cancelDate: new Date() });
        const user = await userTokenService.getToken(payment.userId);
        const token = user.token;
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: 'Payment canceled successfully',
            data: {},
        };
        res.data = response;
        res.redirect(`http://127.0.0.1:5500/server/payment/payment-cancel.html?token=${token}&isSuccess=false`);
    } catch (err) {
        next(err);
    };
};


export default {
    createPayment,
    getPayment,
    completePayment,
    cancelPayment,
};