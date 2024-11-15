import Joi from 'joi';



const eventValidator = {
    createEvent: {
        body: Joi.object().keys({
            eventName: Joi.string().required().trim().messages({ 'string.empty': 'Event name is required' }),
            description: Joi.string().required().trim().messages({ 'string.empty': 'Description is required' }),
            membersId: Joi.array().unique().items(Joi.string().required().trim().messages({ 'string.empty': 'Members Id is required' })),
            date: Joi.date().required().messages({ 'date.empty': 'Date is required' }),
        }),
    },

    getEvent: {
        params: Joi.object().keys({
            eventId: Joi.string().required().trim().messages({ 'string.empty': 'Event Id is required.', }),
        }),
    },

    updateEvent: {
        body: Joi.object().keys({
            eventId: Joi.string().required().trim().messages({ 'string.empty': 'Event Id is required.', }),
            eventName: Joi.string().trim().messages({ 'string.empty': 'Event name is required' }),
            description: Joi.string().trim().messages({ 'string.empty': 'Description is required' }),
            date: Joi.date().messages({ 'date.empty': 'Date is required' }),
        }),
    },

};



export {
    eventValidator,
};