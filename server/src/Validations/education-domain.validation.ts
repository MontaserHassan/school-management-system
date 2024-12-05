import Joi from 'joi';



const educationDomainValidator = {
    createEducationDomain: {
        body: Joi.object().keys({
            schoolId: Joi.string().required().trim().empty('').messages({ 'string.empty': 'School is required.', }),
            cycleId: Joi.string().required().trim().empty('').messages({ 'string.empty': 'Cycle is required.', }),
            educationDomainName: Joi.string().required().trim().empty('').min(3).max(100).messages({
                'string.empty': 'Domain name is required.',
                'string.min': 'Domain name must be at least 3 characters long.',
                'string.max': 'Domain name must not exceed 100 characters.',
            }),
            educationDomainDescription: Joi.string().optional().trim().empty('').min(3).max(256).messages({
                'string.empty': 'Description is required.',
                'string.min': 'Description must be at least 3 characters long.',
                'string.max': 'Description must not exceed 256 characters.',
            }),
            domains: Joi.array().unique().items(Joi.string().required().trim().messages({ 'string.empty': 'Domain Id is required.', })).min(1).messages({
                'string.empty': 'Domains is required.',
                'string.min': 'Domains should have at least 1 domain.',
            }),
        }),
    },

    getEducationDomain: {
        params: Joi.object().keys({
            educationDomainId: Joi.string().required().trim().messages({ 'string.empty': 'Education Domain is required.', }),
        }),
    },
    
    getEducationDomainBySchoolId: {
        params: Joi.object().keys({
            schoolId: Joi.string().required().trim().messages({ 'string.empty': 'School Id is required.', }),
        }),
    },

    updateEducationDomain: {
        body: Joi.object().keys({
            educationDomainId: Joi.string().required().trim().messages({ 'string.empty': 'Education Domain is required.', }),
            educationDomainName: Joi.string().optional().trim().empty('').min(3).max(100).messages({
                'string.empty': 'Domain name is required.',
                'string.min': 'Domain name must be at least 3 characters long.',
                'string.max': 'Domain name must not exceed 100 characters.',
            }),
            educationDomainDescription: Joi.string().optional().trim().empty('').min(3).max(256).messages({
                'string.empty': 'Description is required.',
                'string.min': 'Description must be at least 3 characters long.',
                'string.max': 'Description must not exceed 256 characters.',
            }),
            domains: Joi.array().items(Joi.string().required().trim().messages({ 'string.empty': 'Domain Id is required.', })).min(1).messages({
                'string.empty': 'Domains is required.',
                'string.min': 'Domains should have at least 1 domain.',
            }),
        }),
    },

    deleteEducationDomain: {
        params: Joi.object().keys({
            educationDomainId: Joi.string().required().trim().messages({ 'string.empty': 'Education Domain is required.', }),
        }),
    },
};



export {
    educationDomainValidator,
};