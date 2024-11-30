import Joi from 'joi';



const paymentValidator = {
    createPayment: {
        body: Joi.object().keys({
            studentId: Joi.string().optional().trim().messages({ 'string.empty': 'Student Id is required.', }),
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