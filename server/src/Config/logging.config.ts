import * as winston from 'winston';
import * as dotenv from 'dotenv';
import { Request } from 'express';
import { Response } from 'express';

dotenv.config();



const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

function level() {
    const env = process.env.NODE_ENV || 'development';
    return env === 'development' ? 'debug' : 'info';
}

const format = winston.format.combine(winston.format.printf(({ message }) => message));

const transports = [
    new winston.transports.Console({ level: 'info' }),
];

const logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
});

function logRequestAndResponse(req: Request, res: Response,) {
    delete req.body?.password
    delete req.headers?.authorization;
    delete res.data?.data?.token;
    const requestDetails = {
        method: req.method,
        url: req.url,
        ip: req.ip,
        originalUrl: req.originalUrl,
        headers: req.headers,
        body: req.body,
        query: req.query,
        params: req.params,
        user: req?.user,
        employee: req?.employee,
    };

    const responseDetails = {
        responseData: res.data,
    };

    const logData = {
        level: res.data?.type,
        timestamp: new Date().toISOString(),
        message: res.data?.responseMessage,
        request: requestDetails,
        response: responseDetails,
    };
    let logString = JSON.stringify(logData);
    logString = logString.replace(/"([^"]+)":/g, '$1:');
    logger.info(logString);
};



export default {
    logRequestAndResponse,
};
