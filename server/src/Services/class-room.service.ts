import { ClassRoom, ClassRoomModel } from "../Models/class-room.model";



// ----------------------------- create subject room -----------------------------


const createClassRoom = async (room: string, group: string, teachers: { teacherId: string, teacherName: string }[], schedule: any[], studentCost: string, currencyOfCost: string, mainTopics: { topicId: string, topicName: string }[], schoolId: string) => {

    const newClassRoom: ClassRoomModel = new ClassRoom({
        room: room,
        group: group,
        teachers: teachers,
        schedule: schedule,
        mainTopics: mainTopics,
        studentCost: studentCost,
        currencyOfCost: currencyOfCost,
        schoolId: schoolId,
    });
    await newClassRoom.save();
    return newClassRoom;
};


// ----------------------------- add student -----------------------------


const addStudent = async (room: string, students: { studentId: string, studentName: string }[]) => {
    const newClassRoomData: ClassRoomModel = await ClassRoom.findOneAndUpdate({ room }, { $push: { students: students, }, }, { new: true });
    return newClassRoomData;
};


// ----------------------------- add teacher -----------------------------


const addTeacher = async (room: string, teacher: { teacherId: string, teacherName: string }) => {
    const newClassRoomData: ClassRoomModel = await ClassRoom.findOneAndUpdate({ room }, { $push: { teachers: teacher, }, }, { new: true });
    return newClassRoomData;
};


// ----------------------------- add topic -----------------------------


const addTopic = async (room: string, newTopic: { topicId: string, topicName: string }) => {
    const newClassRoomData: ClassRoomModel = await ClassRoom.findOneAndUpdate({ room }, { $push: { mainTopics: newTopic }, }, { new: true });
    return newClassRoomData;
};


// ----------------------------- get by id -----------------------------


const getById = async (id: string) => {
    const classRoom: ClassRoomModel = await ClassRoom.findById(id).select('-__v');
    return classRoom;
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


// ----------------------------- check teacher exists with class -----------------------------


const getClassRoomByTeacherId = async (teacherId: string) => {
    const classRoom: ClassRoomModel = await ClassRoom.findOne({ "teachers.teacherId": teacherId }).select('-__v');
    return classRoom;
};


// ----------------------------- get students class by teacher -----------------------------


const getStudentsByTeacherId = async (teacherId: string) => {
    const classRoom: ClassRoomModel = await ClassRoom.findOne({ "teachers.teacherId": teacherId }).select('-__v');
    return classRoom;
};


// ----------------------------- total document -----------------------------


const totalDocument = async (schoolId: string) => {
    const numberOfClassRoom = await ClassRoom.countDocuments({ schoolId: schoolId });
    return numberOfClassRoom;
};


// ----------------------------- get all with pagination -----------------------------


const findWithPagination = async (schoolId: string, limit: number, skip: number) => {
    const classRooms: ClassRoomModel[] = await ClassRoom.find({ schoolId: schoolId }).limit(limit).skip(skip).select('-__v');
    return classRooms;
};


// ----------------------------- get all -----------------------------


const find = async () => {
    const classRooms: ClassRoomModel[] = await ClassRoom.find().select('-__v');
    return classRooms;
};


// ----------------------------- update room -----------------------------


const updateRoom = async (room: string, updatedData: any) => {
    const updatedRoom: ClassRoomModel = await ClassRoom.findOneAndUpdate({ room }, { updatedData }, { new: true }).select('-__v');
    return updatedRoom;
};


// ----------------------------- update schedule -----------------------------


const updateScheduleDay = async (room: string, schedule: any) => {
    const updatedRoom: ClassRoomModel = await ClassRoom.findOneAndUpdate({ room, 'schedule.day': schedule.day }, { $set: { 'schedule.$': schedule } }, { new: true, upsert: true }).select('-__v');
    return updatedRoom;
};


// ----------------------------- delete room -----------------------------


const deleteRoom = async (roomId: string) => {
    const deletedRoom: ClassRoomModel = await ClassRoom.findByIdAndDelete(roomId).select('-__v');
    return deletedRoom;
};



export default {
    createClassRoom,
    getByRoom,
    getById,
    getTeachers,
    getByTeacherId,
    getClassRoomByTeacherId,
    getStudentsByTeacherId,
    addStudent,
    addTeacher,
    addTopic,
    totalDocument,
    find,
    findWithPagination,
    updateRoom,
    updateScheduleDay,
    deleteRoom,
};