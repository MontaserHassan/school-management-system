import { NextFunction, Request, Response } from "express";

import { userTokenService, userService } from "../Services/index.service";
import { ErrorUserMessage, SuccessUserMessage, ErrorTokenMessage } from "../Messages/index.message";
import CustomError from "../Utils/customError.util";
import { createToken, pagination } from "../Utils/index.util";
import IResponse from '../Interfaces/response.interface';
import RoleHierarchy from "../Interfaces/user-hierarchy.interface";



// ----------------------------- register -----------------------------


const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userName, email, role, schoolId } = req.body;
        const currentUserRole = req?.user?.role;
        if (!currentUserRole || RoleHierarchy[currentUserRole] <= RoleHierarchy[role]) throw new CustomError(`You do not have permission to create a user with this role: ${role}.`, 403, "role");
        const isEmailExisting = await userService.getUserByEmail((email).toLowerCase());
        if (isEmailExisting && isEmailExisting.email === email) throw new CustomError(ErrorUserMessage.EMAIL_EXISTS, 406, "email");
        const newUser = await userService.createUser(userName, (email).toLowerCase(), role, schoolId);
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: SuccessUserMessage.CREATED,
            data: {
                user: newUser,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- login -----------------------------


const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        let user = await userService.getUserByEmail((email).toLowerCase());
        if (!user) throw new CustomError(ErrorUserMessage.WRONG_CREDENTIALS, 401, "email or password");
        if (!user.updatePassword) throw new CustomError(ErrorUserMessage.UPDATE_PASSWORD, 401, "password");
        const isVerifyPassword = await userService.verifyPassword(user.id, password);
        if (!isVerifyPassword) throw new CustomError(ErrorUserMessage.WRONG_CREDENTIALS, 401, "email or password");
        let token = await userTokenService.getToken(user.id);
        if (!token) {
            const createdToken = createToken.createUserToken(user);
            token = await userTokenService.saveToken(createdToken.secretKey, createdToken.token, user.id, createdToken.expireDate);
        };
        user = await userService.updateLogged(user.id, true);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: SuccessUserMessage.LOGIN,
            data: {
                user: user,
                token: token.token
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- add password -----------------------------


const addPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await userService.getUserByEmail((email).toLowerCase());
        if (!user) throw new CustomError(ErrorUserMessage.NOT_FOUND_USER, 404, "email");
        if (user.updatePassword) throw new CustomError(ErrorUserMessage.PASSWORD_ALREADY_UPDATED, 406, "email");
        const updatedUser = await userService.updateUserPassword(user.id, password);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: SuccessUserMessage.ADD_PASSWORD,
            data: {
                admin: updatedUser
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- logout -----------------------------


const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const { secretKey } = req.token;
        const stoppedToken = await userTokenService.stopToken(secretKey);
        if (!stoppedToken) throw new CustomError(ErrorTokenMessage.TOKEN_INVALID, 404, "token");
        await userService.updateLogged(userId, false)
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: SuccessUserMessage.LOGOUT,
            data: {},
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- update user -----------------------------


const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const { userName, email } = req.body;
        const user = await userService.updateUser(userId, userName, email);
        if (!user) throw new CustomError(ErrorUserMessage.NOT_UPDATED, 404, "user");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: SuccessUserMessage.UPDATED,
            data: {
                user: user
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- update user password -----------------------------


const updateUserPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const { oldPassword, newPassword } = req.body;
        if (oldPassword === newPassword) throw new CustomError(ErrorUserMessage.SAME_PASSWORD, 406, "password");
        const isVerifyPassword = await userService.verifyPassword(userId, oldPassword);
        if (!isVerifyPassword) throw new CustomError(ErrorUserMessage.WRONG_CREDENTIALS, 401, "email or password");
        const updatedUser = await userService.updateUserPassword(userId, newPassword);
        if (!updatedUser) throw new CustomError(ErrorUserMessage.NOT_UPDATED, 404, "user");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: SuccessUserMessage.UPDATED_PASSWORD,
            data: {
                user: updatedUser
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- get profile -----------------------------


const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const user = await userService.updateLogged(userId, true);
        if (!user) throw new CustomError(ErrorUserMessage.NOT_FOUND_USER, 404, "user");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: SuccessUserMessage.GET_PROFILE,
            data: {
                user: user
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- get all users -----------------------------


const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { schoolId } = req.user;
        const { page } = req.query;
        const totalSchools = await userService.totalDocument();
        const paginateData = pagination(totalSchools, Number(page));
        if (paginateData.status === 404) throw new CustomError(paginateData.message, paginateData.status, paginateData.path);
        const users = await userService.findWithPagination(paginateData.limit, paginateData.skip, schoolId);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: SuccessUserMessage.GET_USERS,
            data: {
                users: users
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};



export default {
    registerUser,
    loginUser,
    addPassword,
    logoutUser,
    updateUser,
    updateUserPassword,
    getProfile,
    getAllUsers,
};