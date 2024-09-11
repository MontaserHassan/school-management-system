import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import ValidationSchema from '../Types/joiSchema.type';
import IResponse from 'Interfaces/response.interface';



const validation = (schema: ValidationSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errorValidation: Joi.ValidationError[] = [];
        ['params', 'query', 'body'].forEach((key) => {
            if (schema[key]) {
                const validation: any = schema[key].validate(req[key], { abortEarly: false });
                if (validation.error) {
                    errorValidation.push(validation.error);
                };
            };
        });
        if (errorValidation.length > 0) {
            const errorMessages = errorValidation.map((error) => {
                const allMessages = error.details.map((detail) => ({ message: detail.message, field: detail.path.join('.'), }));
                const firstMessage = allMessages[0].message;
                const firstField = allMessages[0].field;
                return {
                    allMessages,
                    firstMessage,
                    firstField
                };
            });
            throw { status: 422, message: `${errorMessages[0].firstField}: ${errorMessages[0].firstMessage}`, details: errorMessages[0].allMessages };
        } else {
            next();
        };
    } catch (error) {
        const response = {
            url: req.url,
            timestamp: new Date().toISOString(),
            path: "request data",
            responseCode: error.status,
            responseMessage: error.message,
            details: error.details || null
        };
        return res.status(response.responseCode || 500).send(response);
    }
};



export default validation;