import { NextFunction, Request, Response } from "express";

import IResponse from '../Interfaces/response.interface';
import { eventService, lookupService, notificationService, userService } from '../Services/index.service';
import { errorEventMessage, successEventMessage, ErrorUserMessage } from "../Messages/index.message";
import { calculateExpirationDate, CustomError, generateId } from "../Utils/index.util";



// ----------------------------- create group -----------------------------


const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { eventName, description, membersId, date } = req.body;
        const userId = req.user.userId;
        if (!membersId.includes(userId)) membersId.push(userId);
        const eventUsers = membersId.map(async (memberId) => {
            const user = await userService.getById(memberId);
            if (!user) throw new CustomError(ErrorUserMessage.NOT_FOUND_USER, 404, "user");
            await notificationService.createNotification(user._id.toString(), user.schoolId, 'New Event', `Hi ${user.userName}, You have a new Event, check it from events calender`,);
            return {
                schoolId: user.schoolId,
                eventId: generateId(),
                eventName: eventName,
                date: new Date(date),
                description: description,
                userId: user._id.toString(),
                username: user.userName,
                expiryDate: calculateExpirationDate('6m'),
            };
        });
        const eventData = await Promise.all(eventUsers);
        await eventService.createEvent(eventData);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successEventMessage.CREATED,
            data: {
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- get events -----------------------------


const getEventsForUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const events = await eventService.findAllEventsForUser(req.user.userId);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successEventMessage.GET_EVENTS,
            data: {
                events: events,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- get event by id -----------------------------


const getEventById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { eventId } = req.params;
        const event = await eventService.findEventByEventId(eventId, req.user.schoolId);
        if (!event) throw new CustomError(errorEventMessage.NOT_FOUND_EVENT, 404, "event");
        let eventDetails = null;
        if (['admin', 'director'].includes(req.user.role)) eventDetails = await eventService.eventDetails(eventId);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successEventMessage.GET_EVENT,
            data: {
                event: event,
                eventDetails: eventDetails,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- update event -----------------------------


const updateEventResponse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { eventId, newResponse } = req.body;
        const responseData = await lookupService.getById(newResponse)
        const event = await eventService.updateEvent(eventId, responseData.lookupName);
        if (!event) throw new CustomError(errorEventMessage.DOES_NOT_UPDATED, 404, "event");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successEventMessage.UPDATED,
            data: {
                event: event,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};



export default {
    createEvent,
    getEventsForUser,
    getEventById,
    updateEventResponse,
};