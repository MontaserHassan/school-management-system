import Joi from 'joi';



const ticketValidator = {
    sendMail: {
        body: Joi.object().keys({
            receiverIds: Joi.array().items(Joi.string().trim().required().messages({ 'string.empty': 'Receiver email is required.', 'any.required': 'Receiver email is required.' })
            ).required().messages({ 'array.base': 'Receiver IDs must be an array.', 'array.includesRequiredUnknowns': 'At least one receiver email is required.' }),
            subject: Joi.string().required().empty("").trim().messages({ 'string.empty': 'Subject is required.', }),
            content: Joi.string().required().empty("").trim().messages({ 'string.empty': 'Content is required.', }),
        }),
    },

    createTicket: {
        body: Joi.object().keys({
            receiver: Joi.string().required().empty('').trim().messages({ 'string.empty': 'receiver is required.', }),
        }),
    },

    sendMessage: {
        body: Joi.object().keys({
            ticketId: Joi.string().required().empty('').trim().messages({ 'string.empty': 'Ticket Id is required.', }),
            message: Joi.string().required().empty('').trim().messages({ 'string.empty': 'Message is required.', }),
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