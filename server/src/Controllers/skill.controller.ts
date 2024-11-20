import { NextFunction, Request, Response } from "express";

import { classRoomService, studentService, domainService, skillService } from "../Services/index.service";
import { errorClassRoomMessage, errorDomainMessage, errorSkillMessage, successSkillMessage } from "../Messages/index.message";
import CustomError from "../Utils/customError.util";
import IResponse from '../Interfaces/response.interface';
import pagination from '../Utils/pagination.util';



// ----------------------------- create skill -----------------------------


const createSkill = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { skillName, domainId, room } = req.body;
        const { schoolId } = req.user;
        const isDomainExisting = await domainService.getById(domainId);
        if (!isDomainExisting) throw new CustomError(errorDomainMessage.NOT_FOUND_DOMAIN, 404, "domain");
        const isRoomExisting = await classRoomService.getByRoomAndSchoolId(room, schoolId);
        if (!isRoomExisting) throw new CustomError(errorClassRoomMessage.NOT_FOUND_ROOM, 404, "room");
        // const isOperationTrue = isRoomExisting.teachers.some(teacher => teacher.teacherId.toString() === req.user.userId);
        // if (!isOperationTrue) throw new CustomError(errorClassRoomMessage.NOT_TEACHER_AT_CLASS, 400, "teacher");
        const isSkillExisting = await skillService.getByNameAndClassRoom(skillName.toLowerCase(), room, schoolId);
        if (isSkillExisting) throw new CustomError(errorClassRoomMessage.SKILL_EXISTING_IN_ROOM, 400, "skill");
        const skillsLength = await skillService.getLengthSkills(isDomainExisting._id);
        const newSkillId = skillsLength + 1;
        const newSkill = await skillService.createSkill(`s${newSkillId}`, skillName.toLowerCase(), room, isDomainExisting._id, isDomainExisting.domainName, schoolId);
        if (!newSkill) throw new CustomError(errorSkillMessage.DOES_NOT_CREATED, 400, "none");
        const addSkillToRoom = await classRoomService.addSkill(room, { skillId: newSkill._id, skillName: newSkill.skillName });
        if (!addSkillToRoom) throw new CustomError(errorClassRoomMessage.SKILLS_NOT_ADDED, 400, "none");
        await Promise.all(addSkillToRoom.students.map(async (student) => { return await studentService.addSkill(student.studentId, newSkill._id, newSkill.skillName); }));
        await domainService.addNewSkill(domainId, newSkill._id, newSkill.skillName);
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: successSkillMessage.CREATED,
            data: {
                skill: newSkill,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- get skill data -----------------------------


const getSkillData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { skillId } = req.params;
        const skill = await skillService.getById(skillId);
        if (!skill) throw new CustomError(errorSkillMessage.NOT_FOUND_SKILL, 404, "skill");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successSkillMessage.GET_SKILL_DATA,
            data: {
                skill: skill,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- get all skills -----------------------------


const getAllSkills = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page, limit } = req.query;
        const { schoolId } = req.user;
        const totalSkill = await skillService.totalDocument(schoolId);
        const paginateData = pagination(totalSkill, Number(page), Number(limit));
        if (paginateData.status === 404) throw new CustomError(paginateData.message, paginateData.status, paginateData.path);
        const skills = await skillService.findWithPagination(schoolId, paginateData.limit, paginateData.skip);
        if (!skills) throw new CustomError(errorSkillMessage.NOT_FOUND_SKILL, 404, "skill");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successSkillMessage.GET_ALL_SKILLS_DATA,
            data: {
                totalPages: paginateData.totalPages,
                currentPage: paginateData.currentPage,
                limit: paginateData.limit,
                skip: paginateData.skip,
                totalDocuments: paginateData.totalDocuments,
                skills: skills,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};

// ----------------------------- update skill data -----------------------------


const updateSkillData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { skillId, skillName } = req.body;
        const isSkillExisting = await skillService.getById(skillId);
        const newSkillName = !skillName ? isSkillExisting.skillName : (skillName).toLowerCase();
        if (!isSkillExisting) throw new CustomError(errorSkillMessage.NOT_FOUND_SKILL, 404, "skill");
        const skill = await skillService.updateById(skillId, { skillName: newSkillName });
        if (!skill) throw new CustomError(errorSkillMessage.NOT_UPDATED, 404, "skill");
        await studentService.updateSkillDataInStudents(isSkillExisting._id, skillName);
        await classRoomService.updateSkillDataInClassrooms(isSkillExisting._id, newSkillName);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successSkillMessage.UPDATED,
            data: {
                skill: skill,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- delete skill -----------------------------


const deleteSkill = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { skillId } = req.params;
        await skillService.deleteSkill(skillId);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successSkillMessage.DELETED,
            data: {},
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};



export default {
    createSkill,
    getSkillData,
    getAllSkills,
    updateSkillData,
    deleteSkill,
};