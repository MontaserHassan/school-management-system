import Joi from 'joi';



const studentValidator = {
    // validation createStudent
    createStudent: {
        body: Joi.object().keys({
            studentName: Joi.string().required().trim().min(3).max(100).messages({
                'string.empty': 'Student name is required.',
                'string.min': 'Student name must be at least 3 characters long.',
                'string.max': 'Student name must not exceed 100 characters.',
            }),
            classRoom: Joi.number().required().min(100).max(999).messages({
                'string.empty': 'Class room is required.',
                'string.pattern.base': 'Class room must be a number.',
                'number.min': 'Class room must be at least 100.',
                'number.max': 'Class room must not exceed 999.',
            }),
            parentCode: Joi.string().trim().required().messages({ 'string.empty': 'Parent code is required.', }),
        }),
    },

    getStudent: {
        params: Joi.object().keys({
            studentId: Joi.string().required().trim().messages({ 'string.empty': 'Student is required.', }),
        }),
    },

    // validation attendance
    addAttendance: {
        body: Joi.object().keys({
            studentId: Joi.string().required().trim().messages({ 'string.empty': 'Student is required.', }),
            status: Joi.string().required().trim().messages({ 'string.empty': 'Status is required.', }),
            comment: Joi.string().optional().min(10).max(255).trim().messages({ 'string.empty': 'Comment is required.', }),
        }),
    },

    // validation comment
    addComment: {
        body: Joi.object().keys({
            studentId: Joi.string().required().trim().messages({ 'string.empty': 'Student is required.', }),
            comment: Joi.string().required().min(10).max(255).trim().messages({ 'string.empty': 'Comment is required.', }),
            media: Joi.string().optional().messages({ 'string.empty': 'Media is required.', }),
        }),
    },

    // validation progressHistory
    addProgressHistory: {
        body: Joi.object().keys({
            studentId: Joi.string().required().trim().messages({ 'string.empty': 'Student Id is required.', }),
            subjectId: Joi.string().required().trim().messages({ 'string.empty': 'Subject Id is required.', }),
            status: Joi.string().required().messages({ 'string.empty': 'status is required.', }),
        }),
    },

    // validation degree
    addDegree: {
        body: Joi.object().keys({
            studentId: Joi.string().required().trim().messages({ 'string.empty': 'Student Id is required.', }),
            subjectId: Joi.string().required().trim().messages({ 'string.empty': 'Subject Id is required.', }),
            degree: Joi.string().required().messages({ 'string.empty': 'Degree is required.', }),
        }),
    },

    // validation updateStudentData
    updateStudentData: {
        body: Joi.object().keys({
            studentCode: Joi.string().required().trim().messages({ 'string.empty': 'Student is required.', }),
            studentName: Joi.string().required().trim().min(3).max(100).messages({
                'string.empty': 'Student name is required.',
                'string.min': 'Student name must be at least 3 characters long.',
                'string.max': 'Student name must not exceed 100 characters.',
            }),
            classNumber: Joi.string().required().trim().max(6).messages({
                'string.empty': 'Class number is required.',
                'string.max': 'Class number must not exceed 6 characters.',
            }),
            studentCost: Joi.string().required().regex(/^[0-9]+$/).messages({ 'string.empty': 'Student cost is required.', 'string.pattern.base': 'Student cost must be a number.', }),
            currencyOfCost: Joi.string().valid('usd', 'eur', 'jpy', 'ps').required(),
        }),
    },

    deleteStudent: {
        params: Joi.object().keys({
            studentCode: Joi.string().required().trim().messages({ 'string.empty': 'Student is required.', }),
        }),
    },

};



export {
    studentValidator,
};