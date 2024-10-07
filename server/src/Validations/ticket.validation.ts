import Joi from 'joi';



const ticketValidator = {
    sendMail: {
        body: Joi.object().keys({
            receiverMail: Joi.string().required().trim().messages({ 'string.empty': 'Receiver email is required.', }),
            subject: Joi.string().required().empty("").trim().messages({ 'string.empty': 'Subject is required.', }),
            content: Joi.string().required().empty("").trim().messages({ 'string.empty': 'Content is required.', }),
        }),
    },

    createTicket: {
        body: Joi.object().keys({
        }),
    },

    getTicket: {
        params: Joi.object().keys({
            ticketId: Joi.string().required().trim().messages({ 'string.empty': 'Notification Id is required.', }),
        }),
    },
};



export {
    ticketValidator,
};