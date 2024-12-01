import Joi from 'joi';



const paymentValidator = {
    createPayment: {
        body: Joi.object().keys({
            invoiceId: Joi.string().required().trim().messages({ 'string.empty': "Invoice Id is required." }),
        }),
    },

    getPayment: {
        params: Joi.object().keys({
            paymentId: Joi.string().trim().required().messages({ 'string.empty': 'Payment Id is required.', }),
        }),
    },
};



export {
    paymentValidator,
};