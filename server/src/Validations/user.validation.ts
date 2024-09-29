import Joi from 'joi';



const userValidator = {
    registerUser: {
        body: Joi.object().keys({
            userName: Joi.string().required().empty('').trim().max(30),
            email: Joi.string().required().empty('').trim().email().message('Please enter a valid email.'),
            role: Joi.string().required().empty('').trim().valid('superAdmin', 'admin', 'director', 'teacher', 'parent').messages({ 'any.only': 'Please enter a valid role.' }),
            media: Joi.string().optional().empty('').messages({ 'string.empty': 'media cannot be an empty string', }),
            schoolId: Joi.string().optional().trim().max(24).when('role', {
                is: Joi.string().valid('admin', 'director', 'teacher', 'parent'),
                then: Joi.string().invalid('superAdmin').messages({ 'any.invalid': 'SchoolId cannot be "superAdmin" for non-superAdmin roles.' })
            })
        }),
    },

    addParent: {
        body: Joi.object().keys({
            userName: Joi.string().required().empty('').trim().min(8).max(30),
            email: Joi.string().required().empty('').trim().email().message('Please enter a valid email.'),
            media: Joi.string().optional().empty('').messages({ 'string.empty': 'media cannot be an empty string', }),
            students: Joi.array().required().items(
                Joi.object({
                    studentName: Joi.string().required().trim().min(3).max(100).messages({
                        'string.empty': 'Student name is required.',
                        'string.min': 'Student name must be at least 3 characters long.',
                        'string.max': 'Student name must not exceed 100 characters.',
                    }),
                    media: Joi.string().optional().empty('').trim().messages({ 'string.empty': 'Media is required.', }),
                }),
            ).min(1).messages({ 'array.min': 'At least one student must be provided.', 'array.empty': 'At least one student must be provided.', }),
        }),
    },

    loginUser: {
        body: Joi.object().keys({
            email: Joi.string().required().email().message('Please enter a valid email.').trim(),
            password: Joi.string().required(),
        }),
    },

    addPassword: {
        body: Joi.object().keys({
            email: Joi.string().required().email().message('Please enter a valid email.').trim(),
            password: Joi.string().required().min(8).max(20).regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!?@#$%&*_.])[A-Za-z\d!?@#$%&*_.]{8,20}$/).message('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!?@#$%&*_.).'),
        }),
    },

    updateUser: {
        body: Joi.object().keys({
            userId: Joi.string().required().trim().messages({ 'string.empty': 'User Id is required.', 'string.max': 'User Id cannot be longer than 24 characters', }),
            email: Joi.string().optional().trim().email().messages({ 'string.empty': 'Email cannot be an empty string', 'string.email': 'Please enter a valid email', }),
            userName: Joi.string().optional().trim().max(30).empty('').messages({ 'string.empty': 'userName cannot be an empty string', 'string.min': 'userName must be at least 8 characters long', 'string.max': 'userName cannot be longer than 30 characters', }),
            media: Joi.string().optional().empty('').messages({ 'string.empty': 'media cannot be an empty string', }),
        }),
    },
};



export {
    userValidator,
};