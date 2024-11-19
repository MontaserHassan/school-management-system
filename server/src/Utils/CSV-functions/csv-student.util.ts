import * as path from 'path';
import * as fs from 'fs';
import * as ExcelJS from 'exceljs';

import { schoolService } from "../../Services/index.service";
import { StudentModel } from 'Models/student.model';



export async function CSVStudent(student: StudentModel) {
    const workbook = new ExcelJS.Workbook();
    const studentsSheet = workbook.addWorksheet('Students Data');
    studentsSheet.columns = [
        { header: 'Student Code', key: 'studentCode', width: 15 },
        { header: 'Student Name', key: 'studentName', width: 20 },
        { header: 'Group', key: 'group', width: 10 },
        { header: 'Class Room', key: 'classRoom', width: 20 },
        { header: 'Student Cost', key: 'studentCost', width: 15 },
        { header: 'Currency of Cost', key: 'currencyOfCost', width: 20 },
        { header: 'School Name', key: 'schoolName', width: 20 },
    ];
    studentsSheet.getRow(1).font = { size: 13, bold: true, name: 'Times New Roman' };
    studentsSheet.getRow(1).alignment = { horizontal: 'left' };

    const schoolInfo = await schoolService.getSchoolById(student.schoolId);
    if (schoolInfo) {
        studentsSheet.addRow({
            studentCode: student.studentCode,
            studentName: student.studentName,
            group: student.group,
            classRoom: student.classRoom,
            studentCost: student.studentCost,
            currencyOfCost: student.currencyOfCost,
            schoolName: schoolInfo.schoolName,
        });
    };

    const domainsSheet = workbook.addWorksheet('Domains');
    domainsSheet.columns = [
        { header: 'Student Code', key: 'studentCode', width: 15 },
        { header: 'Student Name', key: 'studentName', width: 20 },
        { header: 'Domain', key: 'domain', width: 25 },
        { header: 'Progress Status', key: 'progressStatus', width: 20 },
    ];
    domainsSheet.getRow(1).font = { size: 13, bold: true, name: 'Times New Roman' };
    domainsSheet.getRow(1).alignment = { horizontal: 'left' };
    if (student.domains) {
        for (const domain of student.domains) {
            domainsSheet.addRow({
                studentCode: student.studentCode,
                studentName: student.studentName,
                domain: domain.domainName,
                progressStatus: domain.progressStatus,
            });
        };
    };

    const skillsSheet = workbook.addWorksheet('Skills');
    skillsSheet.columns = [
        { header: 'Student Code', key: 'studentCode', width: 15 },
        { header: 'Student Name', key: 'studentName', width: 20 },
        { header: 'Skill', key: 'skill', width: 25 },
        { header: 'Degree', key: 'degree', width: 20 },
    ];
    skillsSheet.getRow(1).font = { size: 13, bold: true, name: 'Times New Roman' };
    skillsSheet.getRow(1).alignment = { horizontal: 'left' };

    if (student.skills) {
        for (const skill of student.skills) {
            skillsSheet.addRow({
                studentCode: student.studentCode,
                studentName: student.studentName,
                skill: skill.skillName,
                degree: skill.degree || 'N/A',
            });
        };
    };

    const fileName = `student-${student.studentCode}.xlsx`;
    const filePath = path.join(__dirname, '../../../src/Public/CSV', fileName);
    await workbook.xlsx.writeFile(filePath);
    const fileContents = fs.readFileSync(filePath);
    const base64String = fileContents.toString('base64');
    fs.unlinkSync(filePath);
    return base64String;
};
