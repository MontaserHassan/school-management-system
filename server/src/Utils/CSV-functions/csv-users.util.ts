import * as path from 'path';
import * as fs from 'fs';
import * as ExcelJS from 'exceljs';

import { schoolService } from "../../Services/index.service";
import { UserModel } from 'Models/user.model';



export async function CSVUsers(users: UserModel[]) {
    const workbook = new ExcelJS.Workbook();
    const usersWorkSheet = workbook.addWorksheet('Users Data');
    usersWorkSheet.columns = [
        { header: 'Name', key: 'name', width: 15, },
        { header: 'Email', key: 'email', width: 20, },
        { header: 'Code', key: 'code', width: 10, },
        { header: 'Role', key: 'role', width: 10, },
        { header: 'School Name', key: 'schoolName', width: 20, },
    ];
    usersWorkSheet.getRow(usersWorkSheet.lastRow.number).font = { size: 13, bold: true };
    for (const user of users) {
        const schoolInfo = await schoolService.getSchoolById(user.schoolId);
        if (schoolInfo) {
            usersWorkSheet.addRow({
                name: user.userName,
                email: user.email,
                code: user.code,
                role: user.role,
                schoolName: schoolInfo.schoolName,
            });
        };
    };
    const fileName = `users.xlsx`;
    const filePath = path.join(__dirname, '../../../src/Public/CSV', fileName);
    await workbook.xlsx.writeFile(filePath);
    const fileContents = fs.readFileSync(filePath);
    const base64String = fileContents.toString('base64');
    fs.unlinkSync(filePath);
    return base64String;
};
