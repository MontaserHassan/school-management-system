import Joi from 'joi';



const subjectValidator = {
    createSubject: {
        body: Joi.object().keys({
            subjectName: Joi.string().required().trim().min(3).max(100).messages({
                'string.empty': 'Subject name is required.',
                'string.min': 'Subject name must be at least 3 characters long.',
                'string.max': 'Subject name must not exceed 100 characters.',
            }),
            courseTime: Joi.number().required().min(1).max(240).messages({ 'string.empty': 'Course time is required.', })
        }),
    },

    getSubject: {
        params: Joi.object().keys({
            subjectId: Joi.string().required().trim().messages({ 'string.empty': 'Subject is required.', }),
        }),
    },

    updateSubject: {
        body: Joi.object().keys({
            subjectId: Joi.string().required().trim().messages({ 'string.empty': 'Subject is required.', }),
            subjectName: Joi.string().optional().trim().max(100).messages({
                'string.empty': 'Subject name is required.',
                'string.min': 'Subject name must be at least 3 characters long.',
                'string.max': 'Subject name must not exceed 100 characters.',
            }),
            courseTime: Joi.number().optional().min(1).max(240).messages({ 'string.empty': 'Course time is required.', })
        }),
    },

};



export {
    subjectValidator,
};