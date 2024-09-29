import Joi from 'joi';



const topicValidator = {
    createTopic: {
        body: Joi.object().keys({
            room: Joi.string().required().trim().messages({ 'string.empty': 'Room is required.', }),
            subjectId: Joi.string().required().trim().messages({ 'string.empty': 'Subject is required.', }),
            topicName: Joi.string().required().trim().min(3).max(30).messages({
                'string.empty': 'Topic name is required.',
                'string.min': 'Topic name must be at least 3 characters long.',
                'string.max': 'Topic name must not exceed 30 characters.',
            }),
        }),
    },

    getTopic: {
        params: Joi.object().keys({
            topicId: Joi.string().required().trim().messages({ 'string.empty': 'Topic Id is required.', }),
        }),
    },

    updateTopic: {
        body: Joi.object().keys({
            topicId: Joi.string().required().trim().messages({ 'string.empty': 'Topic Id is required.', }),
            topicName: Joi.string().optional().trim().min(3).max(30).messages({
                'string.empty': 'Topic name is required.',
                'string.min': 'Topic name must be at least 3 characters long.',
                'string.max': 'Topic name must not exceed 30 characters.',
            }),
        }),
    },

    deleteTopic: {
        params: Joi.object().keys({
            topicId: Joi.string().required().trim().messages({ 'string.empty': 'Topic Id is required.', }),
        }),
    },

};



export {
    topicValidator,
};