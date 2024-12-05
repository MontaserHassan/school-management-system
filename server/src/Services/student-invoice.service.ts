import { StudentInvoice, StudentInvoiceModel } from "../Models/invoices-student.model";



// ----------------------------- create invoice for student -----------------------------


const createInvoice = async (schoolId: string, senderEmail: string, amount: number, parent: { parentId: string, parentName: string }, student: { studentId: string, studentName: string, }, media: string,) => {
    const invoice: StudentInvoiceModel = new StudentInvoice({
        schoolId: schoolId,
        senderEmail: senderEmail,
        amount: amount,
        parent: parent,
        student: student,
        media: media,
    });
    await invoice.save();
    return invoice;
};


// ----------------------------- find invoices -----------------------------


const findInvoices = async (schoolId: string, limit: number, skip: number) => {
    const invoices: StudentInvoiceModel[] = await StudentInvoice.find({ schoolId }).limit(limit).skip(skip).select('-__v');
    return invoices;
};


// ----------------------------- find invoices by parent id -----------------------------


const findInvoicesByParentId = async (parentId: string, limit: number, skip: number) => {
    const invoices: StudentInvoiceModel[] = await StudentInvoice.find({ 'parent.parentId': parentId }).limit(limit).skip(skip).select('-__v');
    return invoices;
};



// ----------------------------- find invoice by id -----------------------------


const findInvoiceById = async (invoiceId: string) => {
    const notification: StudentInvoiceModel = await StudentInvoice.findById(invoiceId).select('-__v');
    return notification;
};


// ----------------------------- update notification -----------------------------


const updateInvoice = async (invoiceId: string, updatedData: any) => {
    const updatedUser: StudentInvoiceModel = await StudentInvoice.findByIdAndUpdate(invoiceId, updatedData, { new: true }).select('-__v');
    return updatedUser;
};


// ----------------------------- get total documents -----------------------------


const totalDocument = async (schoolId: string, parentId?: string) => {
    const query: Record<string, any> = { schoolId };
    if (parentId) query['parent.parentId'] = parentId;
    const invoices = await StudentInvoice.countDocuments({ schoolId, });
    return invoices;
};



export default {
    createInvoice,
    findInvoices,
    findInvoicesByParentId,
    findInvoiceById,
    updateInvoice,
    totalDocument,
};