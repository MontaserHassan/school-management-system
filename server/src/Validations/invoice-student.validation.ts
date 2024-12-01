import Joi from 'joi';



const studentInvoiceValidator = {
    createStudentInvoice: {
        body: Joi.object().keys({
            parentId: Joi.string().required().trim().empty('').messages({ 'string.empty': 'Parent Id is required.', }),
            amount: Joi.number().required().empty('').messages({ 'string.empty': 'Amount is required.', }),
            studentId: Joi.string().required().trim().empty('').messages({ 'string.empty': 'Student Id is required.', }),
            media: Joi.string().optional().empty('').trim().messages({ 'string.empty': 'Media is required.', }),
        }),
    },

    getStudentInvoice: {
        params: Joi.object().keys({
            invoiceId: Joi.string().required().trim().messages({ 'string.empty': 'Notification Id is required.', }),
        }),
    },

    updateStudentInvoice: {
        body: Joi.object().keys({
            invoiceId: Joi.string().required().trim().messages({ 'string.empty': 'Notification Id is required.', }),
            media: Joi.string().required().trim().messages({ 'string.empty': 'Media is required.', }),
        }),
    }
};



export {
    studentInvoiceValidator,
};