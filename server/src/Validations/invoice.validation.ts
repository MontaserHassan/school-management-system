import Joi from 'joi';



const invoiceValidator = {
    createInvoice: {
        body: Joi.object().keys({
            schoolId: Joi.string().required().trim().messages({ 'string.empty': 'School Id is required.', }),
            media: Joi.string().required().trim().messages({ 'string.empty': 'Media is required.', }),
        }),
    },

    getInvoice: {
        params: Joi.object().keys({
            invoiceId: Joi.string().required().trim().messages({ 'string.empty': 'Notification Id is required.', }),
        }),
    },

    updateInvoice: {
        body: Joi.object().keys({
            invoiceId: Joi.string().required().trim().messages({ 'string.empty': 'Notification Id is required.', }),
            media: Joi.string().required().trim().messages({ 'string.empty': 'Media is required.', }),
        }),
    }
};



export {
    invoiceValidator,
};