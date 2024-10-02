import { Notification, NotificationModel } from '../Models/notification.model';



// ----------------------------- create notification -----------------------------


const createNotification = async (userId: string, schoolId: string, header: string, message: string) => {
    const notification: NotificationModel = new Notification({
        userId,
        schoolId,
        header,
        message,
    });
    await notification.save();
    return notification;
};


// ----------------------------- find notifications by user id -----------------------------


const findNotificationById = async (notificationId: string) => {
    const notification: NotificationModel = await Notification.findById(notificationId).select('-__v');
    return notification;
};


// ----------------------------- find notifications by user id -----------------------------


const findNotificationsByUserId = async (userId: string, schoolId: string) => {
    const notifications: NotificationModel[] = await Notification.find({ schoolId, userId }).select('-__v');
    return notifications;
};


// ----------------------------- update notification -----------------------------


const updateUser = async (userId: string, updatedData: any) => {
    const updatedUser: NotificationModel = await Notification.findOneAndUpdate({ userId }, updatedData, { new: true }).select('-__v');
    return updatedUser;
};



export default {
    createNotification,
    findNotificationById,
    findNotificationsByUserId,
    updateUser,
};