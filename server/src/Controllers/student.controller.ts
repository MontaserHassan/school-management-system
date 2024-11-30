import { NextFunction, Request, Response } from "express";

import { classRoomService, lookupService, progressHistoryService, studentService, skillService, activityService } from "../Services/index.service";
import { errorClassRoomMessage, errorStudentMessage, errorSkillMessage, successStudentMessage, errorDomainMessage, successDomainMessage, errorActivityMessage } from "../Messages/index.message";
import CustomError from "../Utils/customError.util";
import IResponse from '../Interfaces/response.interface';
import { StudentModel } from "../Models/student.model";
import { pagination, calculateSkillDegree, CSVStudent, CSVStudents } from "../Utils/index.util";



// ----------------------------- create student -----------------------------


const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { students } = req.body;
        const { schoolId } = req.user;
        const newStudents = await Promise.all(students.map(async (student: any) => {
            const { studentName, parentId, media } = student;
            const newStudent = await studentService.createStudent(studentName.toLowerCase(), parentId, schoolId, media);
            if (!newStudent) throw new CustomError(errorStudentMessage.DOES_NOT_CREATED, 400, "student");
            return newStudent;
        }));
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: successStudentMessage.CREATED,
            data: {
                students: newStudents,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- add student to class -----------------------------


const addStudentToClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { students, classRoom } = req.body;
        const { schoolId } = req.user;
        const isClassRoomExisting = await classRoomService.getByRoom(classRoom);
        if (!isClassRoomExisting || isClassRoomExisting.schoolId !== schoolId) throw new CustomError(errorClassRoomMessage.NOT_FOUND_ROOM, 400, "classRoom");
        const newStudents = await Promise.all(students.map(async (student: any) => {
            const { studentId } = student;
            const isStudentExisting = await studentService.getStudentById(studentId);
            if (!isStudentExisting || isStudentExisting.schoolId !== schoolId) throw new CustomError(errorStudentMessage.NOT_FOUND_STUDENT, 400, "student");
            if (isStudentExisting.classRoom) return null;
            const domainsData = isClassRoomExisting.schedule ? isClassRoomExisting.schedule.flatMap(schedule => {
                return schedule.domains.map(domain => ({ domainId: domain.domainId, domainName: domain.domainName }));
            }) : [];
            const skillsData = isClassRoomExisting.skills ? isClassRoomExisting.skills.map(skill => {
                return { skillId: skill.skillId, skillName: skill.skillName };
            }) : [];
            const activitiesData = isClassRoomExisting.activities ? isClassRoomExisting.activities.map(activity => {
                return { activityId: activity.activityId, activityName: activity.activityName };
            }) : [];
            const domains = Array.from(new Map(domainsData.map(dom => [dom.domainId.toString(), dom])).values());
            const skills = Array.from(new Map(skillsData.map(skill => [skill.skillId.toString(), skill])).values());
            const activities = Array.from(new Map(activitiesData.map(activity => [activity.activityId.toString(), activity])).values());
            await studentService.addMoreDataToStudent(studentId, classRoom, isClassRoomExisting.group, domains, skills, activities, isClassRoomExisting.studentCost, isClassRoomExisting.currencyOfCost);
            const updatedClassroom = await classRoomService.addStudent(classRoom, [{ studentId: (studentId).toString(), studentName: isStudentExisting.studentName }]);
            if (!updatedClassroom) throw new CustomError(errorClassRoomMessage.DOES_NOT_UPDATED, 400, "classRoom");
            return updatedClassroom;
        }));
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: successDomainMessage.CREATED,
            data: {
                students: newStudents,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- add attendance -----------------------------


const addAttendance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId, status, comment } = req.body;
        const teacherId = req.user.userId;
        const student = await studentService.getStudentById(studentId);
        if (!student) throw new CustomError(errorStudentMessage.DOES_NOT_UPDATED, 400, "student");
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const attendanceRecord = student?.attendance?.find((record: any) => {
            const recordDate = new Date(record.date);
            recordDate.setHours(0, 0, 0, 0);
            return recordDate.getTime() === today.getTime();
        });
        let updatedStudent: StudentModel;
        const attendanceStatus = await lookupService.getById(status);
        if (!attendanceStatus) throw new CustomError(errorStudentMessage.LOOKUPS_NOT_EXISTING, 400, "student");
        if (attendanceRecord) {
            updatedStudent = await studentService.updateAttendanceByDate(student._id, today, attendanceStatus.lookupName, comment);
        } else {
            updatedStudent = await studentService.addAttendance(student._id, attendanceStatus.lookupName, comment);
        };
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: successStudentMessage.ADD_ATTENDANCE,
            data: {
                student: updatedStudent,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- add comment -----------------------------


const addComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId, comment, media } = req.body;
        const teacherId = req.user.userId;
        const student = await studentService.getStudentById(studentId);
        if (!student) throw new CustomError(errorStudentMessage.DOES_NOT_CREATED, 400, "student");
        const updatedStudent = await studentService.addComment(student._id, teacherId, comment, media);
        if (!updatedStudent) throw new CustomError(errorStudentMessage.DOES_NOT_UPDATED, 400, "student");
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: successStudentMessage.ADD_COMMENT,
            data: {
                student: updatedStudent,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- add progress history -----------------------------


const addProgressStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId, domainId, status } = req.body;
        const student = await studentService.getStudentById(studentId);
        if (!student) throw new CustomError(errorStudentMessage.NOT_FOUND_STUDENT, 400, "student");
        const domainExists = student.domains?.find((domain: any) => domain.domainId === domainId);
        if (!domainExists) throw new CustomError(errorStudentMessage.DOMAIN_NOT_EXISTING, 400, "domain");
        const progressStatus = await lookupService.getById(status);
        if (!progressStatus) throw new CustomError(errorStudentMessage.LOOKUPS_NOT_EXISTING, 400, "student");
        const skillsWithoutDegree = await Promise.all(
            student.skills?.map(async (skill) => {
                const skillExists = await skillService.getById(String(skill.skillId));
                if (skillExists.domainId === domainId && !skill.degree) return skillExists;
                return;
            }) || [],
        );
        const filteredSkillsWithoutDegree = skillsWithoutDegree.filter(skill => skill !== null && skill !== undefined);
        const skills = await Promise.all(student.skills.map(async (skill) => {
            const skillsForDomain = await skillService.getByDomainId(domainId);
            const filteredSkills = skillsForDomain.filter((t) => t._id === skill.skillId);
            return filteredSkills.map((filteredSkill) => ({
                skillId: filteredSkill._id,
                skillName: filteredSkill.skillName,
                degree: String(skill.degree),
            }));
        }));
        const flattedSkills = skills.flat();

        const activitiesWithoutDegree = student.activities?.filter(activity => { return flattedSkills.some(skill => skill.skillId === activity.skillId && !activity.degree) });
        const activities = await Promise.all(
            student.activities.map(async (activity) => {
                const matchedSkill = flattedSkills.find(skill => skill.skillId === activity.skillId);
                if (matchedSkill) {
                    return {
                        activityId: String(activity.activityId),
                        activityName: activity.activityName,
                        materialName: activity.materialName,
                        degree: String(activity.degree),
                    };
                };
                return null;
            }),
        );
        const filteredActivities = activities.filter(activity => activity !== null && activity !== undefined);
        if (progressStatus.lookupName === "Completed" && (filteredSkillsWithoutDegree.length > 0 || activitiesWithoutDegree.length > 0)) throw new CustomError(errorStudentMessage.PROGRESS_HISTORY_DOES_NOT_CREATED, 400, "student");
        await progressHistoryService.createNewProgressHistory(studentId, domainId, domainExists.domainName, flattedSkills, filteredActivities, 'Completed', true);
        const updatedStudent = await studentService.addProgressStatus(studentId, domainId, progressStatus.lookupName);
        if (!updatedStudent) throw new CustomError(errorStudentMessage.DOES_NOT_UPDATED, 400, "student");
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: successStudentMessage.ADD_PROGRESS,
            data: {
                student: updatedStudent,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- add degree for activity -----------------------------


const addDegreeOfActivity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId, activityId, degree } = req.body;
        const teacherId = req.user.userId;
        const isActivityExisting = await activityService.getById(activityId);
        if (!isActivityExisting) throw new CustomError(errorActivityMessage.ACTIVITY_NOT_FOUND, 400, "activity");
        const degreeName = await lookupService.getById(degree);
        if (!degreeName) throw new CustomError(errorStudentMessage.LOOKUPS_NOT_EXISTING, 400, "student");
        const student = await studentService.getStudentById(studentId);
        if (!student) throw new CustomError(errorStudentMessage.DOES_NOT_CREATED, 400, "student");
        const checkTeacherWithStudent = await studentService.isTeacherInClassroom(student.classRoom, teacherId);
        if (!checkTeacherWithStudent) throw new CustomError(errorStudentMessage.STUDENT_AND_TEACHER, 400, "teacher");
        const studentActivityExists = student.activities?.some((activity: any) => activity.activityId === activityId);
        if (!studentActivityExists) throw new CustomError(errorActivityMessage.ACTIVITY_NOT_FOUND, 400, "activity");
        let updatedStudent = await studentService.addDegree(studentId, activityId, degreeName.lookupName);
        if (!updatedStudent) throw new CustomError(errorStudentMessage.DOES_NOT_UPDATED, 400, "student");
        const matchActivityAtSkill = updatedStudent.activities.filter(activity => activity.skillId === isActivityExisting.skillId);
        if (matchActivityAtSkill.length > 0) {
            const skillDegree = calculateSkillDegree(matchActivityAtSkill);
            updatedStudent = await studentService.updateSkillStudent(updatedStudent._id, isActivityExisting.skillId, skillDegree);
        };
        const response: IResponse = {
            type: "info",
            responseCode: 201,
            responseMessage: successStudentMessage.ADD_DEGREE,
            data: {
                student: updatedStudent,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- get progress history -----------------------------


const getProgressHistory = async (req: Request, res: Response, next: NextFunction) => {

};


// ----------------------------- get student data -----------------------------


const getStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId } = req.params;
        const { isExport } = req.query;
        const { schoolId, role, userId } = req.user;
        let student = await studentService.getStudentById(studentId);
        if (!student || student.schoolId !== schoolId) throw new CustomError(errorStudentMessage.NOT_FOUND_STUDENT, 404, "student");
        const getClassRoom = await classRoomService.getByRoom(student.classRoom);
        if (role === "teacher") {
            const isTeacherInClass = getClassRoom.teachers.some(teacher => teacher.teacherId.toString() === userId);
            if (!isTeacherInClass) throw new CustomError(errorStudentMessage.STUDENT_AND_TEACHER, 400, "teacher");
        };
        const progressHistory = await progressHistoryService.getProgressHistoryPerStudent(studentId);
        student = { ...student.toObject(), progressHistory };
        let base64String: string;
        if (isExport === "true") {
            base64String = await CSVStudent(student);
        };
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successStudentMessage.GET_PROFILE,
            data: {
                student: student,
                base64String: base64String ? base64String : '',
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- get all students -----------------------------


const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page, limit, isExport } = req.query;
        const { schoolId, role, userId } = req.user;
        let paginateData: any;
        let students: StudentModel[];
        if (role === 'parent') {
            const totalStudents = await studentService.totalDocument(schoolId, userId);
            paginateData = pagination(totalStudents, Number(page), Number(limit));
            if (paginateData.status === 404) throw new CustomError(paginateData.message, paginateData.status, paginateData.path);
            students = await studentService.findAllStudentsOfSchool(schoolId, paginateData.limit, paginateData.skip, { key: 'parentId', value: userId });
        } else if (role === 'teacher') {
            const getClassRoomByTeacherId = await classRoomService.getClassRoomByTeacherId(userId);
            const totalStudents = await studentService.totalDocumentByClassRoom(schoolId, getClassRoomByTeacherId.room);
            paginateData = pagination(totalStudents, Number(page), Number(limit));
            if (paginateData.status === 404) throw new CustomError(paginateData.message, paginateData.status, paginateData.path);
            students = await studentService.findAllStudentsOfSchool(schoolId, paginateData.limit, paginateData.skip, { key: 'classRoom', value: getClassRoomByTeacherId.room });
        } else {
            const totalStudents = await studentService.totalDocument(schoolId);
            paginateData = pagination(totalStudents, Number(page), Number(limit));
            if (paginateData.status === 404) throw new CustomError(paginateData.message, paginateData.status, paginateData.path);
            students = await studentService.findAllStudentsOfSchool(schoolId, paginateData.limit, paginateData.skip);
        };
        let base64String: string;
        if (isExport === "true") {
            base64String = await CSVStudents(students);
        };
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successStudentMessage.GET_PROFILE,
            data: {
                totalPages: paginateData.totalPages,
                currentPage: paginateData.currentPage,
                limit: paginateData.limit,
                skip: paginateData.skip,
                totalDocuments: paginateData.totalDocuments,
                students: students,
                base64String: base64String ? base64String : '',
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- get all students of class room by teacher id-----------------------------


const getStudentsOfTeacher = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const students = await classRoomService.getStudentsByTeacherId(userId);
        if (!students) throw new CustomError(errorStudentMessage.NOT_FOUND_STUDENT, 404, "student");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successStudentMessage.GET_PROFILE,
            data: {
                students: students.students,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- get all students of class room-----------------------------


const getStudentsByClassRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const students = await classRoomService.getStudentsByTeacherId(userId);
        if (!students) throw new CustomError(errorStudentMessage.NOT_FOUND_STUDENT, 404, "student");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successStudentMessage.GET_PROFILE,
            data: {
                students: students.students,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- get all students of class room -----------------------------


const getStudentsByParent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { schoolId } = req.user;
        const { parentId } = req.params;
        const students = await studentService.getStudentsByParentId(parentId, schoolId);
        if (!students) throw new CustomError(errorStudentMessage.NOT_FOUND_STUDENT, 404, "student");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successStudentMessage.GET_PROFILE,
            data: {
                students: students,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- update student -----------------------------


const updateStudentData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId, studentName, paymentStatus } = req.body;
        const isStudentExisting = await studentService.getStudentById(studentId);
        if (!isStudentExisting) throw new CustomError(errorStudentMessage.NOT_FOUND_STUDENT, 404, "student");
        const newStatus = paymentStatus ? paymentStatus : isStudentExisting.paymentStatus;
        const newName = studentName ? studentName.toLowerCase() : isStudentExisting.studentName;
        const updatedStudent = await studentService.updateStudentData(isStudentExisting._id, { studentName: newName, paymentStatus: newStatus });
        if (!updatedStudent) throw new CustomError(errorDomainMessage.NOT_UPDATED, 404, "student");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successStudentMessage.UPDATED,
            data: {
                student: updatedStudent,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};


// ----------------------------- delete student -----------------------------


const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentCode, } = req.params;
        const IsStudentExisting = await studentService.getStudentByStudentCode(studentCode);
        if (!IsStudentExisting) throw new CustomError(errorStudentMessage.NOT_FOUND_STUDENT, 404, "student");
        const deletedStudent = await studentService.deleteStudent(IsStudentExisting._id);
        if (!deletedStudent) throw new CustomError(errorStudentMessage.DOES_NOT_DELETED, 409, "student");
        const response: IResponse = {
            type: "info",
            responseCode: 200,
            responseMessage: successStudentMessage.UPDATED,
            data: {
                student: deletedStudent.studentCode,
            },
        };
        res.data = response;
        return res.status(response.responseCode).send(response);
    } catch (err) {
        next(err);
    };
};



export default {
    createStudent,
    addStudentToClass,
    addAttendance,
    addComment,
    addProgressStatus,
    addDegreeOfActivity,
    getProgressHistory,
    getStudent,
    getAllStudents,
    updateStudentData,
    getStudentsByParent,
    deleteStudent,
    getStudentsOfTeacher,
    getStudentsByClassRoom,
};