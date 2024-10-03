import { StudentInvoice, StudentInvoiceModel } from "../Models/student-invoices.model";



// ----------------------------- create invoice for student -----------------------------


const createInvoice = async (schoolId: string, parent: { parentId: string, parentName: string, }, student: { studentId: string, studentName: string, }, invoices: any,) => {
    const invoice: StudentInvoiceModel = new StudentInvoice({
        schoolId: schoolId,
        parent: parent,
        student: student,
        invoices: invoices,
    });
    await invoice.save();
    return invoice;
};


// ----------------------------- find invoices by parent id -----------------------------


const findInvoiceById = async (parentId: string) => {
    const notification: StudentInvoiceModel = await StudentInvoice.findOne({ parentId }).select('-__v');
    return notification;
};


// ----------------------------- find invoice by invoice number -----------------------------


const findInvoiceByInvoiceNumber = async (invoiceNumber: string) => {
    const notifications: StudentInvoiceModel[] = await StudentInvoice.find({ 'invoices.invoiceNumber': invoiceNumber, }).select('-__v');
    return notifications;
};


// ----------------------------- update notification -----------------------------


const updateInvoice = async (parentId: string, updatedData: any) => {
    const updatedUser: StudentInvoiceModel = await StudentInvoice.findOneAndUpdate({ parentId }, updatedData, { new: true }).select('-__v');
    return updatedUser;
};



export default {
    createInvoice,
    findInvoiceById,
    findInvoiceByInvoiceNumber,
    updateInvoice,
};