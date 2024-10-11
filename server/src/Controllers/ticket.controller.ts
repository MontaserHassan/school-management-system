import { NextFunction, Request, Response } from "express";

import { notificationService, ticketService, userService } from "../Services/index.service";
import IResponse from '../Interfaces/response.interface';
import { successTicketMessage, ErrorUserMessage, errorTicketMessage } from "../Messages/index.message";
import { sendEmail, CustomError, pagination } from "../Utils/index.util";
import { TicketModel } from "Models/tickets.model";



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
        const { userId, schoolId } = req.user;
        const { receiver } = req.body;
        if (userId === receiver) throw new CustomError(errorTicketMessage.SAME_USER, 406, "user");
        const isSender = await userService.getById(userId);
        if (!isSender) throw new CustomError(ErrorUserMessage.NOT_FOUND_USER, 404, "user");
        const isReceiver = await userService.getById(receiver);
        if (!isReceiver) throw new CustomError(ErrorUserMessage.NOT_FOUND_USER, 404, "user");
        let ticket = await ticketService.getTicketBetweenTwoUser(String(isSender.id), String(isReceiver._id));
        let responseMessage: string = successTicketMessage.GET_TICKET_DATA;
        if (!ticket) {
            const userOne = { userId: String(isSender._id), userName: isSender.userName };
            const userTwo = { userId: String(isReceiver._id), userName: isReceiver.userName };
            ticket = await ticketService.createTicket(schoolId, userOne, userTwo,);
            await notificationService.createNotification(receiver, isReceiver.schoolId, 'New Ticket', `Hi ${isReceiver.userName}, You have a new ticket from ${isSender.userName}, check it`, { isTicket: true, ticketId: ticket._id });
            responseMessage = successTicketMessage.CREATED;
        };
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: responseMessage,
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


// ----------------------------- send message -----------------------------


const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const { ticketId, message } = req.body;
        const isTicket = await ticketService.getById(ticketId);
        if (!isTicket) throw new CustomError(errorTicketMessage.NOT_FOUND_TICKET, 404, "ticket");
        const isSender = await userService.getById(userId);
        if (!isSender || ![isTicket.userOne.userId, isTicket.userTwo.userId].includes(String(userId))) throw new CustomError(errorTicketMessage.WRONG_SENDER, 404, "user");
        const receiverId = isTicket.userOne.userId === userId ? isTicket.userTwo.userId : isTicket.userOne.userId;
        const isReceiver = await userService.getById(receiverId);
        const newMessage = await ticketService.addNewMessageById(ticketId, { sender: { senderId: isSender._id, senderName: isSender.userName }, receiver: { receiverId: isReceiver._id, receiverName: isReceiver.userName }, message: message, dateCreation: new Date() }, String(isReceiver._id));
        if (!newMessage) throw new CustomError(errorTicketMessage.DOES_NOT_ADD_MESSAGE, 404, "message");
        await notificationService.createNotification(String(isReceiver._id), isReceiver.schoolId, 'New Message', `Hi ${isReceiver.userName}, You have a new message from ${isSender.userName}, check it`, { isTicket: true, ticketId: isTicket._id });
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successTicketMessage.NEW_MESSAGE,
            data: {
                ticket: newMessage,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- get tickets -----------------------------


const getTickets = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const { limit, page } = req.query;
        const totalUserTickets = await ticketService.totalDocument(userId);
        const paginateData = pagination(totalUserTickets, Number(page), Number(limit));
        const tickets = await ticketService.getTicketsByUserId(userId, paginateData.limit, paginateData.skip);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successTicketMessage.GET_TICKETS,
            data: {
                totalPage: paginateData.totalPages,
                currentPage: paginateData.currentPage,
                limit: paginateData.limit,
                skip: paginateData.skip,
                totalDocuments: paginateData.totalDocuments,
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
        const { userId } = req.user;
        let ticket: TicketModel;
        ticket = await ticketService.getById(ticketId);
        if (userId === ticket.read.userId) {
            const query = { read: { userId: userId, isRead: true } };
            ticket = await ticketService.updateById(ticketId, query);
        };
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
    sendMessage,
    getTickets,
    getTicket,
};