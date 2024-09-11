import Joi from 'joi';



const lookupValidator = {
    createLookup: {
        body: Joi.object().keys({
            masterCode: Joi.string().required().messages({ 'string.empty': 'Master code is required.', }),
            lookups: Joi.array().items(Joi.object().keys({
                masterName: Joi.string().required().messages({ 'string.empty': 'Master name is required.', }),
                lookupCode: Joi.string().required().messages({ 'string.empty': 'Lookup code is required.', }),
                lookupName: Joi.string().required().messages({ 'string.empty': 'Lookup name is required.', }),
                parentCode: Joi.string().allow('').messages({ 'string.empty': 'Parent code can be empty or optional.', }),
            })).required().min(1).max(50).messages({ 'array.min': 'At least one lookup entry is required.', 'array.max': 'You can provide a maximum of 50 lookup entries.' }),
        }),
    },

};



export {
    lookupValidator,
};