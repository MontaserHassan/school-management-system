import Joi from 'joi';



const skillValidator = {
    createSkill: {
        body: Joi.object().keys({
            room: Joi.string().required().trim().messages({ 'string.empty': 'Room is required.', }),
            domainId: Joi.string().required().trim().messages({ 'string.empty': 'Domain is required.', }),
            skillName: Joi.string().required().trim().min(3).max(30).messages({
                'string.empty': 'Skill name is required.',
                'string.min': 'Skill name must be at least 3 characters long.',
                'string.max': 'Skill name must not exceed 30 characters.',
            }),
        }),
    },

    getSkill: {
        params: Joi.object().keys({
            skillId: Joi.string().required().trim().messages({ 'string.empty': 'Skill Id is required.', }),
        }),
    },

    updateSkill: {
        body: Joi.object().keys({
            skillId: Joi.string().required().trim().messages({ 'string.empty': 'Skill Id is required.', }),
            skillName: Joi.string().optional().trim().min(3).max(30).messages({
                'string.empty': 'Skill name is required.',
                'string.min': 'Skill name must be at least 3 characters long.',
                'string.max': 'Skill name must not exceed 30 characters.',
            }),
        }),
    },

    deleteSkill: {
        params: Joi.object().keys({
            skillId: Joi.string().required().trim().messages({ 'string.empty': 'Skill Id is required.', }),
        }),
    },

};



export {
    skillValidator,
};