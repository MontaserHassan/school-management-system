import * as path from 'path';
import * as fs from 'fs';
import * as ExcelJS from 'exceljs';

import { userService } from "../../Services/index.service";
import { SubscriptionSchoolModel } from '../../Models/school.model';



export async function CSVSchool(schools: SubscriptionSchoolModel[]) {
    const workbook = new ExcelJS.Workbook();

    const schoolWorksheet = workbook.addWorksheet('Schools Data');
    schoolWorksheet.eachRow((row) => {
        row.font = { name: 'Times New Roman', };
        row.alignment = { horizontal: 'left' };
    });
    schoolWorksheet.columns = [
        { header: 'School Name', key: 'schoolName', width: 30 },
        { header: 'Subscription Fees', key: 'subscriptionFees', width: 15 },
        { header: 'Subscription Date', key: 'subscriptionDate', width: 15 },
        { header: 'Subscription Way', key: 'subscriptionWay', width: 15 },
        { header: 'Currency', key: 'currencyOfSubscription', width: 15 },
        { header: 'End of Subscription', key: 'endOfSubscription', width: 15 },
        { header: 'Subscription Status', key: 'subscriptionStatus', width: 15 },
    ];
    schoolWorksheet.getRow(1).font = { name: 'Times New Roman', size: 13, bold: true };

    schools.forEach((school) => {
        schoolWorksheet.addRow({
            schoolName: school.schoolName,
            subscriptionFees: school.subscriptionFees,
            subscriptionDate: school.subscriptionDate,
            subscriptionWay: school.subscriptionWay,
            currencyOfSubscription: school.currencyOfSubscription,
            endOfSubscription: school.endOfSubscription,
            subscriptionStatus: school.subscriptionStatus,
        });
    });

    const usersSchoolWorksheet = workbook.addWorksheet('Admins');
    usersSchoolWorksheet.eachRow((row) => {
        row.font = { name: 'Times New Roman', };
        row.alignment = { horizontal: 'left' };
    });
    usersSchoolWorksheet.columns = [
        { header: 'School Name', key: 'schoolName', width: 20 },
        { header: 'Admin Name', key: 'adminName', width: 15 },
        { header: 'Admin Email', key: 'adminEmail', width: 15 },
        { header: 'Role', key: 'role', width: 10 },
    ];
    usersSchoolWorksheet.getRow(1).font = { name: 'Times New Roman', size: 13, bold: true };
    for (const school of schools) {
        const adminData = await userService.getById(school.admin);
        usersSchoolWorksheet.addRow({
            schoolName: school.schoolName,
            adminName: adminData.userName,
            adminEmail: adminData.email,
            role: adminData.role,
        });
    };
    const fileName = 'schools.xlsx';
    const filePath = path.join(__dirname, '../../../src/Public/CSV', fileName);
    await workbook.xlsx.writeFile(filePath);
    const fileContents = fs.readFileSync(filePath);
    const base64String = fileContents.toString('base64');
    fs.unlinkSync(filePath);
    return base64String;
}
