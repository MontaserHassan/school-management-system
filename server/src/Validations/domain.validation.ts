import Joi from 'joi';



const domainValidator = {
    createDomain: {
        body: Joi.object().keys({
            domainName: Joi.string().required().trim().min(3).max(100).messages({
                'string.empty': 'Domain name is required.',
                'string.min': 'Domain name must be at least 3 characters long.',
                'string.max': 'Domain name must not exceed 100 characters.',
            }),
            groupId: Joi.string().required().trim().messages({ 'string.empty': 'Group Id is required.', }),
            courseTime: Joi.number().required().min(1).max(240).messages({ 'string.empty': 'Course time is required.', })
        }),
    },

    getDomain: {
        params: Joi.object().keys({
            domainId: Joi.string().required().trim().messages({ 'string.empty': 'Domain is required.', }),
        }),
    },

    updateDomain: {
        body: Joi.object().keys({
            domainId: Joi.string().required().trim().messages({ 'string.empty': 'Domain is required.', }),
            domainName: Joi.string().optional().trim().max(100).messages({
                'string.empty': 'Domain name is required.',
                'string.min': 'Domain name must be at least 3 characters long.',
                'string.max': 'Domain name must not exceed 100 characters.',
            }),
            courseTime: Joi.number().optional().min(1).max(240).messages({ 'string.empty': 'Course time is required.', })
        }),
    },

    addSkillToDomain: {
        body: Joi.object().keys({
            domainId: Joi.string().required().trim().messages({ 'string.empty': 'Domain is required.', }),
            skillsId: Joi.array().unique().items(Joi.string().required().trim().messages({ 'string.empty': 'Skill Id is required.', })).messages({ 'array.unique': 'Skill Id must be unique.', }),
        }),
    },
};



export {
    domainValidator,
};