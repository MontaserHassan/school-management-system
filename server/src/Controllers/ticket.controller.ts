import { NextFunction, Request, Response } from "express";

import { ticketService, userService } from "../Services/index.service";
import IResponse from '../Interfaces/response.interface';
import { successTicketMessage, ErrorUserMessage, errorTicketMessage } from "../Messages/index.message";
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
        const { user1, user2 } = req.body;
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
        const { userId } = req.user;
        const tickets = await ticketService.getTicketsByUserId(userId);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successTicketMessage.GET_TICKETS,
            data: {
                tickets: tickets,
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
        const { ticketId } = req.params;
        const ticket = await ticketService.getById(ticketId);
        if (!ticket) throw new CustomError(errorTicketMessage.NOT_FOUND_TICKET, 404, "ticket");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successTicketMessage.GET_TICKET,
            data: {
                ticket: ticket,
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