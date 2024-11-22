import Joi from 'joi';



const classRoomValidator = {
    createClassRoom: {
        body: Joi.object().keys({
            room: Joi.string().required().length(3).trim().messages({ 'string.empty': 'Room is required.', }),
            group: Joi.string().required().trim().messages({ 'string.empty': 'Group is required.', }),
            teachersId: Joi.array().unique().items(Joi.string().required()).required().messages({ 'array.empty': 'Teachers is required.', 'array.unique': 'Teachers must be unique.' }),
            schedule: Joi.array().items(Joi.object().keys({
                day: Joi.string().required().messages({ 'string.empty': 'Day is required.', }),
                domains: Joi.array().items(Joi.object().keys({
                    domainId: Joi.string().required().messages({ 'string.empty': 'Domain Id is required.', }),
                    startTime: Joi.string().required().messages({ 'string.empty': 'Start time is required.', }),
                }))
            })),
            skills: Joi.array().unique().items(Joi.string().required()).messages({ 'array.empty': 'Skills are required.', 'array.unique': 'Skills must be unique.', }),
            studentCost: Joi.number().required().min(1).messages({ 'string.empty': 'Student cost is required.', 'string.pattern.base': 'Student cost must be a number.', }),
            currencyOfCost: Joi.string().required(),
        }),
    },

    getRoom: {
        params: Joi.object().keys({
            classRoom: Joi.string().required().trim().messages({ 'string.empty': 'Class Room is required.', }),
        }),
    },

    updateClassRoom: {
        body: Joi.object().keys({
            roomId: Joi.string().required().trim().messages({ 'string.empty': 'Room Id is required.', }),
            room: Joi.string().optional().trim().messages({ 'string.empty': 'Room is required.', }),
            group: Joi.string().optional().trim().messages({ 'string.empty': 'Group is required.', }),
            teachersId: Joi.array().unique().optional().items(Joi.string().required()).messages({ 'array.empty': 'Teachers is required.', 'array.unique': 'Teachers must be unique.' }),
            schedule: Joi.array().optional().items(Joi.object().keys({
                day: Joi.string().required().messages({ 'string.empty': 'Day is required.', }),
                domains: Joi.array().items(Joi.object().keys({
                    domainId: Joi.string().required().messages({ 'string.empty': 'Domain Id is required.', }),
                    startTime: Joi.string().required().messages({ 'string.empty': 'Start time is required.', }),
                }))
            })),
            skills: Joi.array().optional().unique().items(Joi.string().required()).messages({ 'array.empty': 'skills are required.', 'array.unique': 'skills must be unique.', }),
            studentCost: Joi.number().optional().min(1).messages({ 'string.empty': 'Student cost is required.', 'string.pattern.base': 'Student cost must be a number.', }),
            currencyOfCost: Joi.string().optional(),
        }),
    },

    deleteStudentFromClassRoom: {
        body: Joi.object().keys({
            roomId: Joi.string().required().trim().messages({ 'string.empty': 'Room Id is required.', }),
            studentId: Joi.string().required().trim().messages({ 'string.empty': 'Student Id is required.', }),
        }),
    },

    deleteRoom: {
        params: Joi.object().keys({
            room: Joi.string().required().trim().messages({ 'string.empty': 'Class Room is required.', }),
        }),
    },

};



export {
    classRoomValidator,
};