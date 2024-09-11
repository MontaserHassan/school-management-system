import { ClassRoom, ClassRoomModel } from "../Models/class-room.model";



// ----------------------------- create subject room -----------------------------


const createClassRoom = async (room: string, group: string, teachers: { teacherId: string, teacherName: string }[], schedule: any[], studentCost: string, mainTopics: { topicId: string, topicName: string }[]) => {

    const newClassRoom: ClassRoomModel = new ClassRoom({
        room: room,
        group: group,
        teachers: teachers,
        schedule: schedule,
        mainTopics: mainTopics,
        studentCost: studentCost,
    });
    await newClassRoom.save();
    return newClassRoom;
};


// ----------------------------- add student -----------------------------


const addStudent = async (room: string, students: { studentId: string, studentName: string }[]) => {
    const newClassRoomData: ClassRoomModel = await ClassRoom.findOneAndUpdate({ room }, { $push: { students: students, }, });
    return newClassRoomData;
};


// ----------------------------- add teacher -----------------------------


const addTeacher = async (room: string, teacher: { teacherId: string, teacherName: string }[]) => {
    const newClassRoomData: ClassRoomModel = await ClassRoom.findOneAndUpdate({ room }, { $push: { teachers: teacher, }, });
    return newClassRoomData;
};

// ----------------------------- add topic -----------------------------


const addTopic = async (room: string, newTopic: { topicId: string, topicName: string }) => {
    const newClassRoomData: ClassRoomModel = await ClassRoom.findOneAndUpdate({ room }, { $push: { mainTopics: newTopic }, }, { new: true });
    return newClassRoomData;
};

// ----------------------------- get by room -----------------------------


const getByRoom = async (room: string) => {
    const classRoom: ClassRoomModel = await ClassRoom.findOne({ room }).select('-__v');
    return classRoom;
};


// ----------------------------- get teachers -----------------------------


const getTeachers = async () => {
    const classRooms: ClassRoomModel[] = await ClassRoom.find().select('-__v');
    const teachers = classRooms.map((classRoom) => {
        return classRoom.teachers.map((teacher) => {
            return teacher.teacherId;
        });
    });
    return teachers;
};


// ----------------------------- check teacher exists with class -----------------------------


const getByTeacherId = async (teacherId: string) => {
    const classRoom: ClassRoomModel = await ClassRoom.findOne({ "teachers.teacherId": teacherId }).select('-__v');
    return classRoom ? true : false;
};


// ----------------------------- total document -----------------------------


const totalDocument = async () => {
    const numberOfClassRoom = await ClassRoom.countDocuments();
    return numberOfClassRoom;
};


// ----------------------------- get all with pagination -----------------------------


const findWithPagination = async (limit: number, skip: number) => {
    const classRooms: ClassRoomModel[] = await ClassRoom.find().limit(limit).skip(skip).select('-__v');
    return classRooms;
};


// ----------------------------- get all -----------------------------


const find = async () => {
    const classRooms: ClassRoomModel[] = await ClassRoom.find().select('-__v');
    return classRooms;
};


// ----------------------------- delete room -----------------------------


const deleteRoom = async (room: string) => {
    const deletedRoom: ClassRoomModel = await ClassRoom.findOneAndDelete({ room }).select('-__v');
    return deletedRoom;
};



export default {
    createClassRoom,
    getByRoom,
    getTeachers,
    getByTeacherId,
    addStudent,
    addTeacher,
    addTopic,
    totalDocument,
    find,
    findWithPagination,
    deleteRoom,
};