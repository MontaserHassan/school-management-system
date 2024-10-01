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
        const notification = await notificationService.findNotificationById(notificationId);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successNotificationMessage.GET_NOTIFICATION,
            data: {
                notification: notification,
            },
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
};