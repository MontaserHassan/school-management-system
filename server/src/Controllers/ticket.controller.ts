import { NextFunction, Request, Response } from "express";

import { ticketService, userService } from "../Services/index.service";
import IResponse from '../Interfaces/response.interface';
import { successTicketMessage, ErrorUserMessage } from "../Messages/index.message";
import { sendEmail, CustomError } from "../Utils/index.util";



// ----------------------------- send mail -----------------------------


const sendMail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { receiverIds, subject, content } = req.body;
        for (const receiverId of receiverIds) {
            const recipient = await userService.getById(receiverId);
            if (!recipient) throw new CustomError(`User not found for ID: ${receiverId}`, 404, "user");
            sendEmail(recipient.email, subject, content);
        };
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successTicketMessage.MAIL_SENT,
            data: {
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- create ticket -----------------------------


const createTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { schoolId } = req.user;
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successTicketMessage.CREATED,
            data: {
            },
        };
    } catch (err) {
        next(err)
    };
};


// ----------------------------- get tickets -----------------------------


const getTickets = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { schoolId } = req.user;
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successTicketMessage.GET_TICKETS,
            data: {
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- get ticket -----------------------------


const getTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { } = req.params;
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successTicketMessage.GET_TICKET,
            data: {
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};



export default {
    sendMail,
    createTicket,
    getTickets,
    getTicket,
};