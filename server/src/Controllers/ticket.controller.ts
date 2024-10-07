import { NextFunction, Request, Response } from "express";

import { ticketService, userService } from "../Services/index.service";
import IResponse from '../Interfaces/response.interface';
import { successTicketMessage, ErrorUserMessage } from "../Messages/index.message";
import { sendEmail, CustomError } from "../Utils/index.util";



// ----------------------------- send mail -----------------------------


const sendMail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const { receiverMail, subject, content } = req.body;
        const sender = await userService.getById(userId);
        if (!sender) throw new CustomError(ErrorUserMessage.NOT_FOUND_USER, 404, "user");
        const senderId = sender.email;
        await sendEmail(senderId, receiverMail, subject, content);
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