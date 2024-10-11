import { Notification, NotificationModel } from '../Models/notification.model';



// ----------------------------- create notification -----------------------------


const createNotification = async (userId: string, schoolId: string, header: string, message: string, isTicket:Boolean) => {
    const notification: NotificationModel = new Notification({
        userId,
        schoolId,
        header,
        message,
        isTicket
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
    const notifications: NotificationModel[] = await Notification.find({ schoolId, userId }).select('-__v').sort({ createdAt: -1 });
    return notifications;
};


// ----------------------------- update notification -----------------------------


const updateNotification = async (userId: string, updatedData: any) => {
    const updatedUser: NotificationModel = await Notification.findOneAndUpdate({ userId }, updatedData, { new: true }).select('-__v');
    return updatedUser;
};



export default {
    createNotification,
    findNotificationById,
    findNotificationsByUserId,
    updateNotification,
};