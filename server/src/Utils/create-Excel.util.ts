import { Response, } from 'express';
import ExcelJS from 'exceljs';


const generateExcelReport = async (res: Response, studentRecords: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Student Degree Report');

    worksheet.columns = [
        { header: 'Subject', key: 'subjectName', width: 30 },
        { header: 'Degree', key: 'degree', width: 10 },
        { header: 'Teacher ID', key: 'teacherId', width: 30 },
    ];

    studentRecords.forEach((record: any) => {
        worksheet.addRow({
            subjectName: record.subjectName,
            degree: record.degree,
            teacherId: record.teacherId,
        });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=student_report.xlsx');

    await workbook.xlsx.write(res);
    res.end();
};