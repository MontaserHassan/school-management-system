import Joi from 'joi';



const activityValidator = {
    createActivity: {
        body: Joi.object().keys({
            room: Joi.string().required().trim().messages({ 'string.empty': 'Room is required.', }),
            skillId: Joi.string().required().trim().messages({ 'string.empty': 'Skill is required.', }),
            activityName: Joi.string().required().trim().min(3).max(30).messages({
                'string.empty': 'Activity name is required.',
                'string.min': 'Activity name must be at least 3 characters long.',
                'string.max': 'Activity name must not exceed 30 characters.',
            }),
        }),
    },

    getActivity: {
        params: Joi.object().keys({
            activityId: Joi.string().required().trim().messages({ 'string.empty': 'Activity Id is required.', }),
        }),
    },

    updateActivity: {
        body: Joi.object().keys({
            activityId: Joi.string().required().trim().messages({ 'string.empty': 'Activity Id is required.', }),
            activityName: Joi.string().optional().trim().min(3).max(30).messages({
                'string.empty': 'Activity name is required.',
                'string.min': 'Activity name must be at least 3 characters long.',
                'string.max': 'Activity name must not exceed 30 characters.',
            }),
        }),
    },

    deleteActivity: {
        params: Joi.object().keys({
            activityId: Joi.string().required().trim().messages({ 'string.empty': 'Activity Id is required.', }),
        }),
    },

};



export {
    activityValidator,
};