import { NextFunction, Request, Response } from 'express';
import CustomError from '../Utils/customError.util';



function checkRole(allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { role } = req.user || {};
        if (!role || !allowedRoles.includes(role)) return next(new CustomError('Access denied. Insufficient role permissions.', 403, 'role'));
        next();
    };
};



export default checkRole;