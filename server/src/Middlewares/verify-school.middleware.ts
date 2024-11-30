import { NextFunction, Request, Response } from "express";

import { schoolService } from "../Services/index.service";
import { errorSchoolMessage } from "../Messages/index.message";
import CustomError from "../Utils/customError.util";



function isSchoolVerified() {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { schoolId } = req.user;
            if (schoolId !== 'superAdmin') {
                const school = await schoolService.getSchoolById(schoolId);
                if (!school) throw new CustomError(errorSchoolMessage.SCHOOL_NOT_FOUND, 404, "school");
                if (!school.verify) throw new CustomError(errorSchoolMessage.SCHOOL_NOT_VERIFIED, 400, "verification");
            };
            next();
        } catch (error) {
            next(error);
        };
    };
};



export default isSchoolVerified;