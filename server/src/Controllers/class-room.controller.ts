import { NextFunction, Request, Response } from "express";

import { ClassRoomModel } from "../Models/class-room.model";
import { classRoomService, groupService, lookupService, studentService, domainService, skillService, userService } from "../Services/index.service";
import { errorClassRoomMessage, errorSkillMessage, errorStudentMessage, successClassRoomMessage } from "../Messages/index.message";
import { pagination, CSVClassRoom, CustomError } from "../Utils/index.util";
import IResponse from '../Interfaces/response.interface';
import { addTime } from "../helpers/calculate-endTime.helper";



// ----------------------------- create room -----------------------------


const createClassRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { room, group, teachersId, schedule, studentCost, currencyOfCost, skills } = req.body;
        const { schoolId } = req.user;
        const isRoomExisting = await classRoomService.getByRoomAndSchoolId(room, schoolId);
        if (isRoomExisting) throw new CustomError(errorClassRoomMessage.ROOM_ALREADY_TOKED, 400, "room");
        const teachers = await userService.getUserByIdAsTeacher(teachersId);
        const skillsInfo = await skillService.getSkillsById(skills);
        if (teachers.length !== teachersId.length) throw new CustomError('Some teachers do not exist.', 400, 'teachers');
        if (teachersId.length >= 1) {
            for (const teacher of teachersId) {
                const teacherClassRoom = await classRoomService.getByTeacherId(teacher);
                if (teacherClassRoom) throw new CustomError(errorClassRoomMessage.TEACHER_ALREADY_ASSIGNED, 400, "teacher");
            };
        };
        const teachersData = teachers.map(teacher => ({
            teacherId: teacher._id.toString(),
            teacherName: teacher.userName,
        }));
        const skillsData = skillsInfo.map(skill => ({
            skillId: skill._id,
            skillName: skill.skillName,
        }));
        const domains = [];
        for (const entry of schedule) {
            const timeRanges = [];
            for (const domain of entry.domains) {
                const domainExists = await domainService.getById(domain.domainId);
                if (!domainExists) throw new CustomError(`Domain ${domain.domainId} does not exist.`, 400, 'domain');
                domain.endTime = addTime(domain.startTime, domainExists.courseTime);
                domain.domainName = domainExists.domainName;
                const domainStartTime = new Date(`1970-01-01T${domain.startTime}:00Z`);
                const domainEndTime = new Date(`1970-01-01T${domain.endTime}:00Z`);
                for (const { startTime, endTime } of timeRanges) {
                    if ((domainStartTime >= startTime && domainStartTime < endTime) || (domainEndTime > startTime && domainEndTime <= endTime) || (domainStartTime <= startTime && domainEndTime >= endTime)) {
                        throw new CustomError(`Domain time conflict: ${domain.domainId} overlaps with another domain from ${startTime.toTimeString()} to ${endTime.toTimeString()}.`, 400, 'timeConflict');
                    };
                    if (domainStartTime.getTime() === startTime.getTime()) {
                        throw new CustomError(`Domain time conflict: ${domain.domainId} has the same start time as another domain (${domain.startTime}).`, 400, 'timeConflict');
                    };
                };
                timeRanges.push({ startTime: domainStartTime, endTime: domainEndTime });
                domains.push({ domainId: domain.domainId, domainName: domain.domainName, });
            };
        };
        const groupData = await groupService.findGroupById(group);
        const currency = await lookupService.getById(currencyOfCost);
        const newClassRoom = await classRoomService.createClassRoom(room, groupData.groupName, teachersData, schedule, studentCost, currency.lookupName, domains, skillsData, schoolId);
        if (!newClassRoom) throw new CustomError(errorClassRoomMessage.DOES_NOT_CREATED, 400, "none");
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: successClassRoomMessage.CREATED,
            data: {
                classRoom: newClassRoom,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- get class room -----------------------------


const getAllRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page, limit, isExport } = req.query;
        const { schoolId, role, userId } = req.user;
        const rooms: ClassRoomModel[] = [];
        let paginateData;
        if (role === "teacher") {
            const teacherClassRoom = await classRoomService.getClassRoomByTeacherId(userId);
            if (!teacherClassRoom) throw new CustomError(errorClassRoomMessage.NOT_FOUND_CLASS, 404, "domain");
            rooms.push(teacherClassRoom);
        } else {
            const totalRooms = await classRoomService.totalDocument(schoolId);
            paginateData = pagination(totalRooms, Number(page), Number(limit));
            if (paginateData.status === 404) throw new CustomError(paginateData.message, paginateData.status, paginateData.path);
            const getRooms = await classRoomService.findWithPagination(schoolId, paginateData.limit, paginateData.skip);
            if (!rooms) throw new CustomError(errorClassRoomMessage.NOT_FOUND_CLASS, 404, "domain");
            rooms.push(...getRooms);
        };
        let base64String: string;
        if (isExport === "true") {
            base64String = await CSVClassRoom(rooms);
        };
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successClassRoomMessage.GET_ALL,
            data: {
                totalPages: paginateData ? paginateData.totalPages : 1,
                currentPage: paginateData ? paginateData.currentPage : 1,
                limit: paginateData ? paginateData.limit : 1,
                skip: paginateData ? paginateData.skip : 1,
                totalDocuments: paginateData ? paginateData.totalDocuments : 1,
                rooms: rooms,
                base64String: base64String ? base64String : "",
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- get class room -----------------------------


const getClassByRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { classRoom } = req.params;
        const classRoomData = await classRoomService.getByRoom(classRoom);
        if (!classRoomData) throw new CustomError(errorClassRoomMessage.NOT_FOUND_CLASS, 404, "room");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successClassRoomMessage.GET_CLASS_ROOM_DATA,
            data: {
                classRoom: classRoomData,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- get class room byId -----------------------------


const getClassById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { classRoom } = req.params;
        const { schoolId, role } = req.user;
        const { isExport } = req.query;
        const classRoomData = await classRoomService.getById(classRoom);
        if (!classRoomData) throw new CustomError(errorClassRoomMessage.NOT_FOUND_CLASS, 404, "room");
        if (classRoomData.schoolId !== schoolId) throw new CustomError(errorClassRoomMessage.ROOM_NOT_SCHOOL, 404, "school");
        if (role === "teacher") {
            if (!classRoomData.teachers.some(teacher => teacher.teacherId.toString() === req.user.userId)) throw new CustomError(errorClassRoomMessage.NOT_TEACHER_AT_CLASS, 404, "teacher");
        };
        let base64String: string;
        if (isExport === "true") {
            const rooms = [];
            rooms.push(classRoomData);
            base64String = await CSVClassRoom(rooms);
        };
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successClassRoomMessage.GET_CLASS_ROOM_DATA,
            data: {
                classRoom: classRoomData,
                base64String: base64String ? base64String : '',
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- add student -----------------------------


const addStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { classRoom, students } = req.body;
        const classRoomData = await classRoomService.getByRoom(classRoom);
        if (!classRoomData) throw new CustomError(errorClassRoomMessage.NOT_FOUND_CLASS, 404, "room");
        const updateClassRoom = await classRoomService.addStudent(classRoom, students);
        if (!updateClassRoom) throw new CustomError(errorClassRoomMessage.STUDENT_NOT_ADDED, 400, "students");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successClassRoomMessage.GET_CLASS_ROOM_DATA,
            data: {
                classRoom: updateClassRoom,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- update class room -----------------------------


const updateClassRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { schoolId } = req.user;
        const { roomId, room, teachersId, studentCost, currencyOfCost, schedule, group, students, skills } = req.body;
        const classRoomData = await classRoomService.getById(roomId);
        if (!classRoomData || classRoomData.schoolId !== schoolId) throw new CustomError(errorClassRoomMessage.NOT_FOUND_CLASS, 404, "room");
        let updateClassRoom: ClassRoomModel;
        if (room) {
            const isRoomExisting = await classRoomService.getByRoomAndSchoolId(room, schoolId);
            if (isRoomExisting && isRoomExisting._id !== classRoomData._id) throw new CustomError(errorClassRoomMessage.ROOM_ALREADY_TOKED, 400, "room");
            updateClassRoom = await classRoomService.updateRoom(classRoomData._id, { room });
        };
        if (teachersId) {
            const newTeachers = [];
            for (const teacherId of teachersId) {
                const teacher = await userService.getById(teacherId);
                if (!teacher) throw new CustomError(errorClassRoomMessage.TEACHER_NOT_FOUND, 404, "teacher");
                const teacherExists = await classRoomService.getByTeacherId(teacherId);
                const teacherInClass = classRoomData.teachers.some(teacher => teacher.teacherId.toString() === teacherId);
                if (teacherExists && !teacherInClass) throw new CustomError(errorClassRoomMessage.TEACHER_ALREADY_ASSIGNED, 400, "teacher");
                newTeachers.push({ teacherId: teacher._id, teacherName: teacher.userName, });
            };
            if (newTeachers.length > 0) updateClassRoom = await classRoomService.updateRoom(classRoomData._id, { teachers: newTeachers });
        };
        if (skills) {
            const newSkills = [];
            for (const skill of skills) {
                const skillData = await skillService.getById(skill);
                if (!skillData) throw new CustomError(errorSkillMessage.SKILL_NOT_FOUND, 404, "skill");
                newSkills.push({ skillId: skillData._id, skillName: skillData.skillName });
            };
            if (newSkills.length > 0) updateClassRoom = await classRoomService.updateRoom(classRoomData._id, { skills: newSkills });
        };
        if (studentCost) {
            updateClassRoom = await classRoomService.updateRoom(classRoomData._id, { studentCost });
        };
        if (currencyOfCost) {
            const currency = await lookupService.getById(currencyOfCost);
            updateClassRoom = await classRoomService.updateRoom(classRoomData._id, { currencyOfCost: currency.lookupName });
        };
        if (group) {
            const getGroupName = await groupService.findGroupById(group);
            updateClassRoom = await classRoomService.updateRoom(classRoomData._id, { group: getGroupName.groupName });
        };
        if (schedule) {
            const newSchedule = [];
            for (const entry of schedule) {
                const timeRanges = [];
                for (const domain of entry.domains) {
                    const domainExists = await domainService.getById(domain.domainId);
                    if (!domainExists) throw new CustomError(`Domain ${domain.domainId} does not exist.`, 400, 'domain');
                    domain.endTime = addTime(domain.startTime, domainExists.courseTime);
                    domain.domainName = domainExists.domainName;
                    const domainStartTime = new Date(`1970-01-01T${domain.startTime}:00Z`);
                    const domainEndTime = new Date(`1970-01-01T${domain.endTime}:00Z`);
                    for (const { startTime, endTime } of timeRanges) {
                        if ((domainStartTime >= startTime && domainStartTime < endTime) || (domainEndTime > startTime && domainEndTime <= endTime) || (domainStartTime <= startTime && domainEndTime >= endTime)) {
                            throw new CustomError(`Domain time conflict: ${domain.domainId} overlaps with another domain from ${startTime.toTimeString()} to ${endTime.toTimeString()}.`, 400, 'timeConflict');
                        };
                        if (domainStartTime.getTime() === startTime.getTime()) throw new CustomError(`Domain time conflict: ${domain.domainId} has the same start time as another domain (${domain.startTime}).`, 400, 'timeConflict');
                    };
                    timeRanges.push({ startTime: domainStartTime, endTime: domainEndTime });
                };
                newSchedule.push(entry);
            };
            updateClassRoom = await classRoomService.updateRoom(classRoomData._id, { schedule: newSchedule });
        };
        if (students) {
            const newStudents = [];
            for (const student of students) {
                const studentExists = await studentService.getStudentById(student);
                if (!studentExists) throw new CustomError(`Student ${student} does not exist.`, 400, 'student');
                newStudents.push({ studentId: studentExists._id, studentName: studentExists.studentName, });
            };
            updateClassRoom = await classRoomService.updateRoom(classRoomData.room, { students: newStudents });
        };
        if (!updateClassRoom) throw new CustomError(errorClassRoomMessage.DOES_NOT_UPDATED, 400, "class");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successClassRoomMessage.GET_CLASS_ROOM_DATA,
            data: {
                classRoom: updateClassRoom,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- delete student from class room -----------------------------


const deleteStudentFromClassRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { roomId, studentId } = req.body;
        const classRoom = await classRoomService.getById(roomId);
        if (!classRoom) throw new CustomError(errorClassRoomMessage.NOT_FOUND_CLASS, 404, "class room");
        const student = await studentService.getStudentById(studentId);
        const studentExists = classRoom.students.some(student => student.studentId === studentId);
        if (!student || !studentExists) throw new CustomError(errorStudentMessage.NOT_FOUND_STUDENT, 404, "student");
        const updateClassRoom = await classRoomService.deleteStudentFromClassRoom(roomId, studentId);
        if (!updateClassRoom) throw new CustomError(errorClassRoomMessage.STUDENT_NOT_DELETED, 400, "student");
        await studentService.updateStudentData(studentId, { classRoom: '', group: '', studentCost: '', currencyOfCost: '', skills: [], domains: [] });
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successClassRoomMessage.STUDENT_DELETED,
            data: {
                classRoom: updateClassRoom,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};


// ----------------------------- delete class room -----------------------------


const deleteClassRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { room } = req.params;
        const classRoom = await classRoomService.getById(room);
        if (!classRoom) throw new CustomError(errorClassRoomMessage.NOT_FOUND_CLASS, 404, "class room");
        const students = await studentService.getStudentsByClassRoom(classRoom.room);
        const updateStudent = students.map(student => { return studentService.updateStudentData(student._id, { classRoom: "", studentCost: '', currencyOfCost: '', group: '', domains: [], skills: [], attendance: [] }); });
        await Promise.all(updateStudent);
        await classRoomService.deleteRoom(classRoom._id);
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successClassRoomMessage.DELETED,
            data: {},
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err)
    };
};



export default {
    createClassRoom,
    addStudent,
    updateClassRoom,
    getAllRoom,
    getClassById,
    getClassByRoom,
    deleteStudentFromClassRoom,
    deleteClassRoom,
};