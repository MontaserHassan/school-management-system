import { Invoice, InvoiceModel } from '../Models/invoices.model';



// ----------------------------- create invoice -----------------------------


const createInvoice = async (schoolId: string, admin: { adminId: string, adminName: string }, media: string,) => {
    const invoice: InvoiceModel = new Invoice({
        schoolId: schoolId,
        admin: admin,
        media: media,
    });
    await invoice.save();
    return invoice;
};


// ----------------------------- find invoices -----------------------------


const findInvoices = async (limit: number, skip: number) => {
    const invoices: InvoiceModel[] = await Invoice.find().limit(limit).skip(skip).select('-__v');
    return invoices;
};


// ----------------------------- find invoices by user id -----------------------------


const findInvoicesBySchoolId = async (SchoolId: string, limit: number, skip: number) => {
    const invoices: InvoiceModel[] = await Invoice.find({ SchoolId }).limit(limit).skip(skip).select('-__v');
    return invoices;
};


// ----------------------------- find invoices by user id -----------------------------


const findInvoiceById = async (invoiceId: string) => {
    const notification: InvoiceModel = await Invoice.findById(invoiceId).select('-__v');
    return notification;
};


// ----------------------------- update invoices -----------------------------


const updateInvoice = async (invoiceId: string, updatedData: any) => {
    const updatedInvoice: InvoiceModel = await Invoice.findByIdAndUpdate(invoiceId, updatedData, { new: true }).select('-__v');
    return updatedInvoice;
};


// ----------------------------- get total documents -----------------------------


const totalDocument = async (schoolId?: string) => {
    const invoices = await Invoice.countDocuments(schoolId ? { schoolId } : {});
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