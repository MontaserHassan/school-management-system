import { SchoolInvoice, SchoolInvoiceModel } from '../Models/invoices-school.model';



// ----------------------------- create invoice -----------------------------


const createInvoice = async (amount: number, senderEmail: string, school: { schoolId: string, schoolName: string }, admin: { adminId: string, adminName: string }, media?: string,) => {
    const invoice: SchoolInvoiceModel = new SchoolInvoice({
        school: school,
        senderEmail: senderEmail,
        amount: amount,
        admin: admin,
        media: media,
    });
    await invoice.save();
    return invoice;
};


// ----------------------------- find invoices -----------------------------


const findInvoices = async (limit: number, skip: number) => {
    const invoices: SchoolInvoiceModel[] = await SchoolInvoice.find().limit(limit).skip(skip).select('-__v');
    return invoices;
};


// ----------------------------- find invoices by user id -----------------------------


const findInvoicesBySchoolId = async (schoolId: string, limit: number, skip: number) => {
    const invoices: SchoolInvoiceModel[] = await SchoolInvoice.find({ 'school.schoolId': schoolId }).limit(limit).skip(skip).select('-__v');
    return invoices;
};


// ----------------------------- find invoices by user id -----------------------------


const findInvoiceById = async (invoiceId: string) => {
    const notification: SchoolInvoiceModel = await SchoolInvoice.findById(invoiceId).select('-__v');
    return notification;
};


// ----------------------------- update invoices -----------------------------


const updateInvoice = async (invoiceId: string, updatedData: any) => {
    const updatedInvoice: SchoolInvoiceModel = await SchoolInvoice.findByIdAndUpdate(invoiceId, updatedData, { new: true }).select('-__v');
    return updatedInvoice;
};


// ----------------------------- get total documents -----------------------------


const totalDocument = async (schoolId?: string) => {
    const invoices = await SchoolInvoice.countDocuments(schoolId ? { schoolId } : {});
    return invoices;
};



export default {
    createInvoice,
    findInvoices,
    findInvoicesBySchoolId,
    findInvoiceById,
    updateInvoice,
    totalDocument,
};