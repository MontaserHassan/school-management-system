import { NextFunction, Request, Response } from "express";

import { notificationService, } from "../Services/index.service";
import IResponse from '../Interfaces/response.interface';
import { successNotificationMessage } from "../Messages/index.message";



// ----------------------------- get notifications -----------------------------


const getNotifications = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, schoolId } = req.user;
        const notifications = await notificationService.findNotificationsByUserId(userId, schoolId);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successNotificationMessage.GET_NOTIFICATIONS,
            data: {
                notifications: notifications,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- get notifications -----------------------------


const getNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { notificationId } = req.params;
        const updatedNotification = await notificationService.updateNotification(notificationId, { read: true });
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successNotificationMessage.GET_NOTIFICATION,
            data: {
                notification: updatedNotification,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};



// ----------------------------- get notifications -----------------------------


const readAllNotifications = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const updatedNotification = await notificationService.updateNotificationsByUserId(userId);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successNotificationMessage.READ_ALL,
            data: {},
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};



export default {
    getNotifications,
    getNotification,
    readAllNotifications,
};