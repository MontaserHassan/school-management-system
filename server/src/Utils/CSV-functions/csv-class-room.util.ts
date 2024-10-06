import * as path from 'path';
import * as fs from 'fs';

import { ClassRoomModel } from "../../Models/class-room.model";
import { schoolService } from "../../Services/index.service";
import { exportToCsv } from "../../Utils/index.util";



export async function CSVClassRoom(rooms) {
    const headers = [
        { id: 'room', title: 'Room' },
        { id: 'group', title: 'Group' },
        { id: 'numberOfStudents', title: 'Number of Students' },
        { id: 'schedule', title: 'Schedule' },
        { id: 'mainTopics', title: 'Main Topics' },
        { id: 'studentCost', title: 'Student Cost' },
        { id: 'currencyOfCost', title: 'Currency' },
        { id: 'schoolName', title: 'School Name' },
    ];
    const studentsData = [];
    for (const classRoom of rooms) {
        if (classRoom.students) {
            const numberOfStudents = classRoom.students.length;
            const schoolInfo = await schoolService.getSchoolById(classRoom.schoolId);
            if (schoolInfo) {
                studentsData.push({
                    room: classRoom.room,
                    group: classRoom.group,
                    numberOfStudents: numberOfStudents,
                    schedule: classRoom.schedule?.map(s => `${s.day}: ${s.subjects.map(sub => `${sub.subjectName} (${sub.startTime} - ${sub.endTime})`).join(', ')}`).join('; ') || '',
                    mainTopics: classRoom.mainTopics?.map(topic => topic.topicName).join(', ') || '',
                    studentCost: classRoom.studentCost,
                    currencyOfCost: classRoom.currencyOfCost,
                    schoolName: schoolInfo.schoolName,
                });
            };
        };
    };
    const fileName = `classrooms_students.csv`;
    const filePath = path.join(__dirname, '../../../src/Public/CSV', fileName);
    await exportToCsv({ filePath, headers, data: studentsData, fileName });
    const fileContents = fs.readFileSync(filePath, { encoding: 'utf8' });
    const base64String = Buffer.from(fileContents, 'utf8').toString('base64');
    fs.unlinkSync(filePath);
    return base64String;
};