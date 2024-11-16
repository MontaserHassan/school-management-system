import Joi from 'joi';



const studentValidator = {
    createStudent: {
        body: Joi.object().keys({
            students: Joi.array().items(
                Joi.object({
                    studentName: Joi.string().required().trim().min(3).max(100).messages({
                        'string.empty': 'Student name is required.',
                        'string.min': 'Student name must be at least 3 characters long.',
                        'string.max': 'Student name must not exceed 100 characters.',
                    }),
                    parentId: Joi.string().trim().required().messages({ 'string.empty': 'Parent code is required.', }),
                    media: Joi.string().optional().empty('').trim().messages({ 'string.empty': 'Media cannot be an empty string.', }),
                })
            ).min(1).required().messages({
                'array.min': 'At least one student must be provided.',
                'array.base': 'Students must be an array of objects.',
            }),
        }),
    },

    addMoreDataToStudent: {
        body: Joi.object().keys({
            classRoom: Joi.string().required().trim().messages({ 'string.empty': 'Class room is required.', }),
            students: Joi.array().items(
                Joi.object({ studentId: Joi.string().required().trim().messages({ 'string.empty': 'Student Id is required.', }), })
            ).min(1).required().messages({ 'array.min': 'At least one student must be provided.', 'array.base': 'Students must be an array of objects.', })
        }),
    },

    getStudent: {
        params: Joi.object().keys({
            studentId: Joi.string().required().trim().messages({ 'string.empty': 'Student is required.', }),
        }),
    },

    addAttendance: {
        body: Joi.object().keys({
            studentId: Joi.string().required().trim().messages({ 'string.empty': 'Student is required.', }),
            status: Joi.string().required().trim().messages({ 'string.empty': 'Status is required.', }),
            comment: Joi.string().optional().max(255).trim().messages({ 'string.empty': 'Comment is required.', }),
        }),
    },

    addComment: {
        body: Joi.object().keys({
            studentId: Joi.string().required().trim().messages({ 'string.empty': 'Student is required.', }),
            comment: Joi.string().required().max(255).trim().messages({ 'string.empty': 'Comment is required.', }),
            media: Joi.string().optional().messages({ 'string.empty': 'Media is required.', }),
        }),
    },

    addProgressHistory: {
        body: Joi.object().keys({
            studentId: Joi.string().required().trim().messages({ 'string.empty': 'Student Id is required.', }),
            domainId: Joi.string().required().trim().messages({ 'string.empty': 'Domain Id is required.', }),
            status: Joi.string().required().messages({ 'string.empty': 'status is required.', }),
        }),
    },

    addDegree: {
        body: Joi.object().keys({
            studentId: Joi.string().required().trim().messages({ 'string.empty': 'Student Id is required.', }),
            topicId: Joi.string().required().trim().messages({ 'string.empty': 'Topic Id is required.', }),
            degree: Joi.string().required().messages({ 'string.empty': 'Degree is required.', }),
        }),
    },

    updateStudentData: {
        body: Joi.object().keys({
            studentId: Joi.string().required().trim().messages({ 'string.empty': 'Student is required.', }),
            studentName: Joi.string().required().trim().min(3).max(100).messages({
                'string.empty': 'Student name is required.',
                'string.min': 'Student name must be at least 3 characters long.',
                'string.max': 'Student name must not exceed 100 characters.',
            }),
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