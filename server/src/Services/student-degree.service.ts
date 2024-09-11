import { Student, StudentModel } from "../Models/student.model";



// ----------------------------- create new record -----------------------------


const createStudentRecord = async (studentCode: string, classNumber: string, subject: any) => {
    const newRecord: StudentModel = new Student({
        studentCode: studentCode,
        class: classNumber,
        subjects: subject,
    });
    await newRecord.save();
    return newRecord;
};


// ----------------------------- get degrees by student code -----------------------------


const getDegreesByStudentCodeAndClass = async (studentCode: string, classNumber: string) => {
    const record: StudentModel = await Student.findOne({ studentCode, class: classNumber }).select('-__v');
    return record;
};


// ----------------------------- get by id -----------------------------


const getAllStudentRecords = async (studentCode: string) => {
    const records: StudentModel[] = await Student.find({ studentCode }).select('-__v');
    return records;
};


// ----------------------------- update by student code -----------------------------


const updateStudentRecord = async (studentCode: string, classNumber: string, updateData: any) => {
    const updatedData: StudentModel = await Student.findOneAndUpdate({ studentCode, class: classNumber }, updateData, { new: true }).select('-__v');
    return updatedData;
};



export default {
    createStudentRecord,
    getAllStudentRecords,
    getDegreesByStudentCodeAndClass,
    updateStudentRecord,
};