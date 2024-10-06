import { Response } from 'express';
import { createObjectCsvWriter } from 'csv-writer';



interface CsvHeader {
    id: string;
    title: string;
};

interface CsvExportOptions {
    filePath: string;
    headers: CsvHeader[];
    fileName: string;
    data: Record<string, any>[];
};



export const exportToCsv = async ({ filePath, headers, data }: CsvExportOptions): Promise<void> => {
    try {
        const csvWriter = createObjectCsvWriter({ path: filePath, header: headers, encoding: 'utf8', });
        await csvWriter.writeRecords(data);
    } catch (error) {
        console.log(`Error occurred while creating CSV file: ${error}`);
    };
};