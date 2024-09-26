import Joi from 'joi';



const classRoomValidator = {
    createClassRoom: {
        body: Joi.object().keys({
            room: Joi.string().required().length(3).trim().messages({ 'string.empty': 'Room is required.', }),
            group: Joi.string().required().trim().messages({ 'string.empty': 'Group is required.', }),
            teachersId: Joi.array().unique().items(Joi.string().required()).required().messages({ 'array.empty': 'Teachers is required.', 'array.unique': 'Teachers must be unique.' }),
            schedule: Joi.array().items(Joi.object().keys({
                day: Joi.string().required().messages({ 'string.empty': 'Day is required.', }),
                subjects: Joi.array().items(Joi.object().keys({
                    subjectId: Joi.string().required().messages({ 'string.empty': 'subject Id is required.', }),
                    startTime: Joi.string().required().messages({ 'string.empty': 'Start time is required.', }),
                }))
            })),
            mainTopics: Joi.array().unique().items(Joi.string().required()).required().messages({ 'array.empty': 'Main topics is required.', 'array.unique': 'Main topics must be unique.', }),
            studentCost: Joi.number().required().min(1).messages({ 'string.empty': 'Student cost is required.', 'string.pattern.base': 'Student cost must be a number.', }),
            currencyOfCost: Joi.string().required(),
        }),
    },

    getRoom: {
        params: Joi.object().keys({
            classRoom: Joi.string().required().trim().messages({ 'string.empty': 'Subject is required.', }),
        }),
    },

    updateClassRoom: {
        body: Joi.object().keys({
            room: Joi.string().required().trim().messages({ 'string.empty': 'Room is required.', }),
            group: Joi.string().optional().trim().messages({ 'string.empty': 'Group is required.', }),
            teacherId: Joi.string().optional().trim().messages({ 'string.empty': 'Teacher is required.', }),
            schedule: Joi.array().optional().items(Joi.object().keys({
                day: Joi.string().required().messages({ 'string.empty': 'Day is required.', }),
                subjects: Joi.array().items(Joi.object().keys({
                    subjectId: Joi.string().required().messages({ 'string.empty': 'subject Id is required.', }),
                    startTime: Joi.string().required().messages({ 'string.empty': 'Start time is required.', }),
                }))
            })),
            mainTopics: Joi.array().optional().unique().items(Joi.string().required()).messages({ 'array.empty': 'Main topics is required.', 'array.unique': 'Main topics must be unique.', }),
            studentCost: Joi.number().optional().min(1).messages({ 'string.empty': 'Student cost is required.', 'string.pattern.base': 'Student cost must be a number.', }),
            currencyOfCost: Joi.string().optional(),
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