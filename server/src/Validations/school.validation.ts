import Joi from 'joi';



const schoolValidator = {
    createSchool: {
        body: Joi.object().keys({
            schoolName: Joi.string().required().trim().messages({ 'string.empty': 'School name is required.', }),
            subscriptionFees: Joi.string().required().trim().messages({ 'string.empty': 'Subscription fees are required.', }),
            currencyOfSubscription: Joi.string().required().trim().messages({ 'string.empty': 'Currency of subscription is required.', }),
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
            adminId: Joi.string().optional().trim().messages({ 'string.empty': 'Admin ID is required.', }),
            adminUserName: Joi.string().optional().trim().messages({ 'string.empty': 'Admin user name is required.', }),
            adminEmail: Joi.string().optional().trim().messages({ 'string.empty': 'Admin email is required.', }),
            schoolName: Joi.string().optional().trim().messages({ 'string.empty': 'School name is required.', }),
            subscriptionFees: Joi.string().optional().trim().messages({ 'string.empty': 'Subscription fees are required.', }),
            currencyOfSubscription: Joi.string().optional().trim().messages({ 'string.empty': 'Currency of subscription is required.', }),
            subscriptionWay: Joi.string().optional().trim().valid('monthly', 'yearly').messages({ 'any.only': 'Subscription way must be either "monthly" or "yearly".', }),
            subscriptionStatus: Joi.string().optional().trim().messages({ 'string.empty': 'Subscription status is required.', }),
        }),
    },

    verifySchool: {
        body: Joi.object().keys({
            schoolId: Joi.string().required().trim().messages({ 'string.empty': 'School is required.', }),
            verify: Joi.boolean().required().messages({ 'any.required': "Please enter 'true' or 'false' for verification.", 'boolean.base': "Please enter 'true' or 'false' for verification.", }),
        }),
    },

    addDomainToCycle: {
        body: Joi.object().keys({
            schoolId: Joi.string().required().trim().messages({ 'string.empty': 'School ID is required.', }),
            cycleId: Joi.string().required().trim().messages({ 'string.empty': 'Cycle ID is required.', }),
            domains: Joi.array().items({
                domainId: Joi.string().required().trim().messages({ 'string.empty': 'Domain ID is required.', }),
                comment: Joi.string().required().trim().messages({ 'string.empty': 'Comment is required.', }),
            }).min(1).messages({ 'array.min': 'At least one domain is required.', 'array.base': 'Domains must be an array of strings.', }),
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