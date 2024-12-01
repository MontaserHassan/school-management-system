import Joi from 'joi';



const schoolInvoiceValidator = {
    createSchoolInvoice: {
        body: Joi.object().keys({
            schoolId: Joi.string().required().trim().messages({ 'string.empty': 'School Id is required.', }),
            media: Joi.string().optional().empty('').trim().messages({ 'string.empty': 'Media is required.', }),
        }),
    },

    getSchoolInvoice: {
        params: Joi.object().keys({
            invoiceId: Joi.string().required().trim().messages({ 'string.empty': 'Notification Id is required.', }),
        }),
    },

    updateSchoolInvoice: {
        body: Joi.object().keys({
            invoiceId: Joi.string().required().trim().messages({ 'string.empty': 'Notification Id is required.', }),
            media: Joi.string().required().trim().messages({ 'string.empty': 'Media is required.', }),
        }),
    }
};



export {
    schoolInvoiceValidator,
};