import * as path from 'path';
import * as fs from 'fs';
import * as ExcelJS from 'exceljs';

import { ClassRoomModel } from "../../Models/class-room.model";
import { schoolService } from "../../Services/index.service";
import { calculateDuration } from '../index.util';



export async function CSVClassRoom(rooms: ClassRoomModel[]) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Class Rooms Data');
    worksheet.eachRow((row) => {
        row.font = { name: 'Times New Roman', };
        row.alignment = { horizontal: 'left' };
    });
    worksheet.columns = [
        { header: 'Room', key: 'room', width: 15 },
        { header: 'Group', key: 'group', width: 10 },
        { header: 'Number of Students', key: 'numberOfStudents', width: 25 },
        { header: 'Student Cost', key: 'studentCost', width: 15 },
        { header: 'Currency', key: 'currencyOfCost', width: 10 },
        { header: 'School Name', key: 'schoolName', width: 20 },
    ];
    worksheet.getRow(1).font = { name: 'Times New Roman', size: 13, bold: true };

    for (const classRoom of rooms) {
        const numberOfStudents = classRoom?.students?.length || 0;
        const schoolInfo = await schoolService.getSchoolById(classRoom.schoolId);
        if (schoolInfo) {
            worksheet.addRow({
                room: classRoom.room,
                group: classRoom.group,
                numberOfStudents: numberOfStudents,
                studentCost: classRoom.studentCost,
                currencyOfCost: classRoom.currencyOfCost,
                schoolName: schoolInfo.schoolName,
            });
        };
    };

    const scheduleTable = workbook.addWorksheet('Schedules');
    scheduleTable.eachRow((row) => {
        row.font = { name: 'Times New Roman', };
        row.alignment = { horizontal: 'left' };
    });
    const scheduleHeaders = [
        { header: 'Room', key: 'room', width: 15 },
        { header: 'Day', key: 'day', width: 15 },
        { header: 'Domain', key: 'domain', width: 30 },
        { header: 'Start', key: 'start', width: 15 },
        { header: 'End', key: 'end', width: 15 },
        { header: 'Duration', key: 'duration', width: 15 },
    ];
    scheduleTable.columns = scheduleHeaders;
    scheduleTable.getRow(1).font = { name: 'Times New Roman', size: 13, bold: true };
    for (const classRoom of rooms) {
        if (classRoom.schedule) {
            for (const daySchedule of classRoom.schedule) {
                const day = daySchedule.day;
                for (const dom of daySchedule.domains) {
                    const domainEntry = `${dom.domainName}`;
                    const startTime = dom.startTime;
                    const endTime = dom.endTime;
                    const duration = calculateDuration(startTime, endTime);
                    scheduleTable.addRow({
                        room: classRoom.room,
                        day: day,
                        domain: domainEntry,
                        start: startTime,
                        end: endTime,
                        duration: duration,
                    });
                };
            };
        };
    };

    const skillsTable = workbook.addWorksheet('Skills');
    skillsTable.eachRow((row) => {
        row.font = { name: 'Times New Roman' };
        row.alignment = { horizontal: 'left' };
    });
    const skillsHeaders = [
        { header: 'Room', key: 'room', width: 15 },
        { header: 'Skills', key: 'skills', width: 30 },
    ];
    skillsTable.columns = skillsHeaders;
    skillsTable.getRow(1).font = { name: 'Times New Roman', size: 13, bold: true };
    for (const classRoom of rooms) {
        if (classRoom.skills) {
            for (const skill of classRoom.skills) {
                skillsTable.addRow({
                    room: classRoom.room,
                    skills: skill.skillName,
                });
            };
        };
    };

    const studentsTable = workbook.addWorksheet('Students');
    studentsTable.eachRow((row) => {
        row.font = { name: 'Times New Roman' };
        row.alignment = { horizontal: 'left' };
    });
    const studentsHeaders = [
        { header: 'Room', key: 'room', width: 15 },
        { header: 'Student Name', key: 'studentName', width: 30 },
    ];
    studentsTable.columns = studentsHeaders;
    studentsTable.getRow(1).font = { name: 'Times New Roman', size: 13, bold: true };
    for (const classRoom of rooms) {
        if (classRoom.students) {
            for (const student of classRoom.students) {
                studentsTable.addRow({
                    room: classRoom.room,
                    studentName: student.studentName,
                });
            };
        };
    };

    const teachersTable = workbook.addWorksheet('Teachers');
    teachersTable.eachRow((row) => {
        row.font = { name: 'Times New Roman' };
        row.alignment = { horizontal: 'left' };
    });
    const teachersHeaders = [
        { header: 'Room', key: 'room', width: 15 },
        { header: 'Teacher Name', key: 'teacherName', width: 30 },
    ];
    teachersTable.columns = teachersHeaders;
    teachersTable.getRow(1).font = { name: 'Times New Roman', size: 13, bold: true };
    for (const classRoom of rooms) {
        if (classRoom.teachers) {
            for (const teacher of classRoom.teachers) {
                teachersTable.addRow({
                    room: classRoom.room,
                    teacherName: teacher.teacherName,
                });
            };
        };
    };

    const fileName = 'classrooms.xlsx';
    const filePath = path.join(__dirname, '../../../src/Public/CSV', fileName);
    await workbook.xlsx.writeFile(filePath);
    const fileContents = fs.readFileSync(filePath);
    const base64String = fileContents.toString('base64');
    fs.unlinkSync(filePath);
    return base64String;
}
