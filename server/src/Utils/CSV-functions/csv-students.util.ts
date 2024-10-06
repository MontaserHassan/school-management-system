import * as path from 'path';
import * as fs from 'fs';
import * as ExcelJS from 'exceljs';

import { schoolService } from "../../Services/index.service";
import { StudentModel } from 'Models/student.model';



export async function CSVStudents(students: StudentModel[]) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Students Data');
    worksheet.columns = [
        { header: 'Student Code', key: 'studentCode', width: 15, },
        { header: 'Student Name', key: 'studentName', width: 20, },
        { header: 'Group', key: 'group', width: 10, },
        { header: 'Class Room', key: 'classRoom', width: 20, },
        { header: 'Student Cost', key: 'studentCost', width: 15, },
        { header: 'Currency of Cost', key: 'currencyOfCost', width: 20, },
        { header: 'School Name', key: 'schoolName', width: 20, },
    ];
    worksheet.getRow(worksheet.lastRow.number).font = { size: 13, bold: true };
    for (const student of students) {
        const schoolInfo = await schoolService.getSchoolById(student.schoolId);
        if (schoolInfo) {
            worksheet.addRow({
                studentCode: student.studentCode,
                studentName: student.studentName,
                group: student.group,
                classRoom: student.classRoom,
                studentCost: student.studentCost,
                currencyOfCost: student.currencyOfCost,
                schoolName: schoolInfo.schoolName,
            });
        };
    };
    const fileName = `students.xlsx`;
    const filePath = path.join(__dirname, '../../../src/Public/CSV', fileName);
    await workbook.xlsx.writeFile(filePath);
    const fileContents = fs.readFileSync(filePath);
    const base64String = fileContents.toString('base64');
    fs.unlinkSync(filePath);
    return base64String;
};
