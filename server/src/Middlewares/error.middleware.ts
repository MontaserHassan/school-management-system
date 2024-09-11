import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../Utils/index.util';


function errorHandler(err: CustomError, req: Request, res: Response, next: NextFunction) {
    const response = {
        type: "error",
        url: req.originalUrl,
        timestamp: new Date().toISOString(),
        path: err.path,
        responseCode: err.message === "jwt expired" ? 401 : err.statusCode,
        responseMessage: err.message
    };
    res.data = response;
    return res.status(response.responseCode || 500).send(response);
};



export default errorHandler;