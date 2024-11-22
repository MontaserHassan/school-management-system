import { NextFunction, Request, Response } from "express";

import { paymentService } from "../Services/index.service";
import { CustomError } from "../Utils/index.util";
import IResponse from '../Interfaces/response.interface';



// ----------------------------- create payment -----------------------------


const createPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, amount, currency } = req.body;
        const createPayment = await paymentService.createPayment(name, amount, currency);
        if (!createPayment) throw new CustomError('Payment not created', 400, 'payment');
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: 'Payment created successfully',
            data: {
                payment: createPayment,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
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



export default {
    createPayment,
    getPayment,
};