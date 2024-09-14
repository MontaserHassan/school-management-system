import Joi from 'joi';



const userValidator = {
    registerUser: {
        body: Joi.object().keys({
            userName: Joi.string().required().trim().min(8).max(30),
            email: Joi.string().required().trim().email().message('Please enter a valid email.'),
            role: Joi.string().required().trim().valid('superAdmin', 'admin', 'director', 'teacher', 'parent').messages({ 'any.only': 'Please enter a valid role.' }),
            schoolId: Joi.string().optional().trim().max(24).when('role', {
                is: Joi.string().valid('admin', 'director', 'teacher', 'parent'),
                then: Joi.string().invalid('superAdmin').messages({ 'any.invalid': 'SchoolId cannot be "superAdmin" for non-superAdmin roles.' })
            })
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
};



export {
    userValidator,
};