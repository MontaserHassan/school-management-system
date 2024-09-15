import Joi from 'joi';



const schoolValidator = {
    createSchool: {
        body: Joi.object().keys({
            schoolName: Joi.string().required().trim().messages({ 'string.empty': 'School name is required.', }),
            subscriptionFees: Joi.string().required().trim().messages({ 'string.empty': 'Subscription fees are required.', }),
            subscriptionWay: Joi.string().optional().trim().valid('monthly', 'yearly').messages({ 'any.only': 'Subscription way must be either "monthly" or "yearly".', }),
            subscriptionStatus: Joi.string().optional().trim().valid('pending', 'paid', 'expired').messages({ 'any.only': 'Subscription status must be "pending", "paid", or "expired".', }),
            admin: Joi.object().keys({
                userName: Joi.string().required().trim().messages({ 'string.empty': 'User name is required.', }),
                email: Joi.string().required().trim().messages({ 'string.empty': 'Email is required.', }),
            }).required().messages({ 'object.base': 'Admin is required.', }),
            employees: Joi.alternatives().conditional(Joi.array().min(1), {
                then: Joi.array().items(Joi.string().required()).min(1).messages({ 'array.min': 'Employees must contain at least one employee.', 'array.base': 'Employees must be an array of strings.', }),
                otherwise: Joi.optional(),
            }),
        }),
    },

    getSchool: {
        params: Joi.object().keys({
            schoolId: Joi.string().required().trim().messages({ 'string.empty': 'School ID is required.', }),
        }),
    },

    addEmployee: {
        body: Joi.object().keys({
            schoolId: Joi.string().required().trim().messages({ 'string.empty': 'School ID is required.', }),
            adminId: Joi.string().required().trim().messages({ 'string.empty': 'Admin ID is required.', }),
        }),
    },

    updateSchool: {
        body: Joi.object().keys({
            schoolId: Joi.string().required().trim().messages({ 'string.empty': 'School ID is required.', }),
            schoolName: Joi.string().optional().trim().messages({ 'string.empty': 'School name is required.', }),
            subscriptionFees: Joi.string().optional().trim().messages({ 'string.empty': 'Subscription fees are required.', }),
            subscriptionWay: Joi.string().optional().trim().valid('monthly', 'yearly').messages({ 'any.only': 'Subscription way must be either "monthly" or "yearly".', }),
            subscriptionStatus: Joi.string().optional().trim().valid('pending', 'paid', 'expired').messages({ 'any.only': 'Subscription status must be "pending", "paid", or "expired".', }),
        }),
    },

    deleteSchool: {
        params: Joi.object().keys({
            schoolId: Joi.string().required().trim().messages({ 'string.empty': 'School ID is required.', }),
        }),
    },

};



export {
    schoolValidator,
};