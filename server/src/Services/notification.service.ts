import { Notification, NotificationModel } from '../Models/notification.model';



// ----------------------------- create notification -----------------------------


const createNotification = async (userId: string, schoolId: string, header: string, message: string, ticket?: { isTicket: boolean, ticketId: string }) => {
    const notification: NotificationModel = new Notification({
        userId,
        schoolId,
        header,
        message,
        ticket,
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


const findNotificationsByUserId = async (userId: string) => {
    const notifications: NotificationModel[] = await Notification.find({ userId }).select('-__v').sort({ createdAt: -1 });
    return notifications;
};


// ----------------------------- update notifications by user id -----------------------------


const updateNotificationsByUserId = async (userId: string) => {
    const notifications = await Notification.updateMany({ userId, read: false }, { $set: { read: true } },);
    return notifications;
};


// ----------------------------- update notification -----------------------------


const updateNotification = async (notificationId: string, updatedData: any) => {
    const updatedUser: NotificationModel = await Notification.findByIdAndUpdate(notificationId, updatedData, { new: true }).select('-__v');
    return updatedUser;
};



export default {
    createNotification,
    findNotificationById,
    findNotificationsByUserId,
    updateNotificationsByUserId,
    updateNotification,
};