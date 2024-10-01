import AppDataSource from '../Config/orm.config';
import { Notification, NotificationModel } from 'Models/notification.model';



// ----------------------------- create notification -----------------------------


const createNotification = async (userId: string, schoolId: string, message: string) => {
    const notification: NotificationModel = new Notification({
        userId,
        schoolId,
        message,
    });
    await notification.save();
    return notification;
};


// ----------------------------- find notifications by user id -----------------------------


const findNotificationsById = async (userId: string, schoolId) => {
    const users: NotificationModel[] = await Notification.find({ schoolId, userId }).select('-__v');
    return users;
};


// ----------------------------- update notification -----------------------------


const updateUser = async (userId: string, updatedData: any) => {
    const updatedUser: NotificationModel = await Notification.findOneAndUpdate({ userId }, updatedData, { new: true }).select('-__v');
    return updatedUser;
};



export default {
    createNotification,
    findNotificationsById,
    updateUser,
};