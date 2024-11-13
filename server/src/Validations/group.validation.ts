import Joi from 'joi';



const groupValidator = {
    getGroups: {
        params: Joi.object().keys({
            groupId: Joi.string().required().trim().messages({ 'string.empty': 'Group Id is required.', }),
        }),
    },
};



export {
    groupValidator,
};