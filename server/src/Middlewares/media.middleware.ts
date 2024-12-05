import { Request, Response, NextFunction } from 'express';
import CustomError from '../Utils/customError.util';
import { ErrorMediaMessage } from '../Messages/index.message';



const MAX_SIZE = 4 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf',];


export function mediaMediaHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { media } = req.body;
        if (!media) throw new CustomError(ErrorMediaMessage.FILE_NOT_FOUND, 400, 'media');
        const base64Data = media.split(';base64,');
        if (base64Data.length !== 2) throw new CustomError(ErrorMediaMessage.INVALID_BASE64, 400, 'media');
        const mimeType = base64Data[0].split(':')[1];
        const imageData = base64Data[1];
        if (!ALLOWED_TYPES.includes(mimeType)) throw new CustomError(ErrorMediaMessage.UNSUPPORTED_FILE, 400, 'media');
        const buffer = Buffer.from(imageData, 'base64');
        if (buffer.length > MAX_SIZE) throw new CustomError(ErrorMediaMessage.FILE_SIZE, 400, 'media');
        next();
    } catch (err) {
        next(err)
    };
};