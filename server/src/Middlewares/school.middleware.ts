import { NextFunction, Request, Response } from "express";

import { schoolService } from "../Services/index.service";
import { errorSchoolMessage } from "../Messages/index.message";
import CustomError from "../Utils/customError.util";



function isSchoolSubscription() {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { schoolId } = req.user;
            if (!schoolId) throw new CustomError(errorSchoolMessage.SCHOOLID_INVALID, 400, "subscription");
            if (schoolId !== 'superAdmin') {
                const school = await schoolService.getSchoolById(schoolId);
                if (!school) throw new CustomError(errorSchoolMessage.SCHOOL_NOT_FOUND, 404, "subscription");
                if (!school.subscriptionStatus || school.subscriptionStatus !== "paid") throw new CustomError(errorSchoolMessage.FEES_NOT_PAID, 401, "subscription");
            };
            next();
        } catch (error) {
            next(error);
        };
    };
};



export default isSchoolSubscription;