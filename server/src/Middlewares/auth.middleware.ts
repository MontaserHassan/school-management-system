import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

import { ErrorTokenMessage } from "../Messages/index.message";
import CustomError from "../Utils/customError.util";



function getUser() {
    return async (req: Request, res: Response, next: NextFunction) => {
        let token: string;
        try {
            const headerToken = req.headers['authorization'];
            if (!headerToken || !headerToken.startsWith(`${process.env.BEARER_SECRET} `)) throw new CustomError(ErrorTokenMessage.headerInvalid, 401, "token");
            token = headerToken.split(" ")[1];
            if (!token || token?.length < 1) throw new CustomError(ErrorTokenMessage.tokenInvalid, 401, "token");
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded) throw new CustomError(ErrorTokenMessage.signatureInvalid, 401, "token");
            const currentTime = Math.floor(Date.now() / 1000);
            if (decoded.exp && decoded.exp < currentTime) throw new CustomError(ErrorTokenMessage.tokenExpired, 401, "token");
            req.user = { userId: decoded.id, role: decoded.role, };
            req.token = { secretKey: decoded.secretKey };
            next();
        } catch (error) {
            next(error);
        };
    };
};



export default getUser;