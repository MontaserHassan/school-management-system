import { Invoice, InvoiceModel } from 'Models/invoices.model';
import { Notification, NotificationModel } from '../Models/notification.model';



// ----------------------------- create notification -----------------------------


const createInvoice = async (schoolId: string, invoices: any,) => {
    const invoice: InvoiceModel = new Invoice({
        schoolId: schoolId,
        invoices: invoices,
    });
    await invoice.save();
    return invoice;
};


// ----------------------------- find invoices by user id -----------------------------


const findInvoiceById = async (invoiceId: string) => {
    const notification: InvoiceModel = await Invoice.findById(invoiceId).select('-__v');
    return notification;
};


// ----------------------------- find invoice by user id -----------------------------


const findInvoiceByInvoiceNumber = async (invoiceNumber: string) => {
    const notifications: InvoiceModel[] = await Invoice.find({ 'invoices.invoiceNumber': invoiceNumber, }).select('-__v');
    return notifications;
};


// ----------------------------- update notification -----------------------------


const updateInvoice = async (userId: string, updatedData: any) => {
    const updatedUser: NotificationModel = await Notification.findOneAndUpdate({ userId }, updatedData, { new: true }).select('-__v');
    return updatedUser;
};



export default {
    createInvoice,
    findInvoiceById,
    findInvoiceByInvoiceNumber,
    updateInvoice,
};