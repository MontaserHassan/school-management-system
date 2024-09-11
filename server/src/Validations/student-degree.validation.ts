import Joi from 'joi';


const studentDegreeValidator = {
    createStudentDegree: {
        body: Joi.object().keys({
            studentCode: Joi.string().required().trim().max(10).messages({
                'string.empty': 'Student code is required.',
                'string.max': 'Student code must not exceed 10 characters.',
            }),
            classNumber: Joi.string().required().trim().max(3).messages({
                'string.empty': 'Class number is required.',
                'string.max': 'Class number must not exceed 3 characters.',
            }),
            subject: Joi.object({
                subjectName: Joi.string().min(3).max(100).required().trim().messages({
                    'string.empty': 'Please enter a valid subject name.',
                    'string.min': 'Subject name must be at least 3 characters long.',
                    'string.max': 'Subject name must not exceed 100 characters.',
                }),
                degree: Joi.number().required().min(0).max(100).messages({
                    'number.base': 'Degree must be a number.',
                    'number.min': 'Please enter a valid degree. The degree must be at least 0.',
                    'number.max': 'Please enter a valid degree. The degree must be at most 100.',
                    'any.required': 'Please enter a valid degree.',
                }),
            }).required().messages({
                'any.required': 'Subject information is required.',
            }),
        }),
    },
    addDegree: {
        body: Joi.object().keys({
        }),
    },
    updateDegree: {
        body: Joi.object().keys({
        }),
    },
};



export {
    studentDegreeValidator,
};