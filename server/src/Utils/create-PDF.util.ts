import { Request, Response, NextFunction } from 'express';
import PDFDocument from 'pdfkit';



export const generatePDFReport = (res: Response, studentRecords: any) => {
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=student_report.pdf');

    doc.pipe(res);

    doc.fontSize(16).text('Student Degree Report', { align: 'center' });
    doc.moveDown();

    studentRecords.forEach((record: any, index: number) => {
        doc.fontSize(12).text(`${index + 1}. Subject: ${record.subjectName}`);
        doc.text(`Degree: ${record.degree}`);
        doc.text(`Teacher ID: ${record.teacherId}`);
        doc.moveDown();
    });

    doc.end();
};