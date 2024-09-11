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
            mainTopics: Joi.array().items(Joi.object().keys({
                topicId: Joi.string().required().messages({ 'string.empty': 'Topic Id is required', }),
            })),
            studentCost: Joi.number().required().min(1).messages({ 'string.empty': 'Student cost is required.', 'string.pattern.base': 'Student cost must be a number.', }),
        }),
    },

    getRoom: {
        params: Joi.object().keys({
            classRoom: Joi.string().required().trim().messages({ 'string.empty': 'Subject is required.', }),
        }),
    },

    addStudents: {
        body: Joi.object().keys({
            room: Joi.string().required().length(3).trim().messages({ 'string.empty': 'Room is required.', }),
            studentsId: Joi.array().items(Joi.string().required()).required().messages({ 'array.empty': 'Students is required.', }),
        }),
    },

    addTeacher: {
        body: Joi.object().keys({
            teachersId: Joi.array().items(Joi.string().required()).required().messages({ 'array.empty': 'Students is required.', }),
        }),
    },

    deleteRoom: {
        params: Joi.object().keys({
            room: Joi.string().required().trim().messages({ 'string.empty': 'Subject is required.', }),
        }),
    },

};



export {
    classRoomValidator,
};