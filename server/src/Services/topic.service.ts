import { MainTopic, MainTopicModel } from '../Models/main-topics.model';



// ----------------------------- create topic -----------------------------


const createTopic = async (topicName: string, room: string, subject: { subjectId: string, subjectName: string }, schoolId: string) => {
    const newTopic: MainTopicModel = new MainTopic({
        topicName: (topicName).toLowerCase(),
        subject: subject,
        schoolId: schoolId,
        classRoom: room,
    });
    await newTopic.save();
    return newTopic;
};


// ----------------------------- get by name -----------------------------


const getByName = async (topicName: string) => {
    const subject: MainTopicModel = await MainTopic.findOne({ topicName }).select('-__v');
    return subject;
};


// ----------------------------- get by name and class room -----------------------------


const getByNameAndClassRoom = async (topicName: string, classRoom: string) => {
    const subject: MainTopicModel = await MainTopic.findOne({ topicName, classRoom }).select('-__v');
    return subject;
};



// ----------------------------- get by id -----------------------------


const getById = async (topicId: string) => {
    const topic: MainTopicModel = await MainTopic.findById(topicId).select('-__v');
    return topic;
};


// ----------------------------- get topics by topic id -----------------------------


const getTopicsById = async (id: string[]) => {
    const user = await MainTopic.find({ _id: { $in: id } }).select('-__v');
    return user;
};


// ----------------------------- total document -----------------------------


const totalDocument = async (schoolId: string) => {
    const mainTopics = await MainTopic.countDocuments({ schoolId });
    return mainTopics;
};


// ----------------------------- find all with pagination -----------------------------


const findWithPagination = async (schoolId: string, limit: number, skip: number) => {
    const mainTopics: MainTopicModel[] = await MainTopic.find({ schoolId: schoolId }).limit(limit).skip(skip).select('-__v');
    return mainTopics;
};


// ----------------------------- find all  -----------------------------


const find = async () => {
    const mainTopic: MainTopicModel[] = await MainTopic.find().select('-__v');
    return mainTopic;
};


// ----------------------------- update by id -----------------------------


const updateById = async (topicId: string, updatedData: any) => {
    const updatedTopic: MainTopicModel = await MainTopic.findByIdAndUpdate(topicId, updatedData, { new: true }).select('-__v');
    return updatedTopic;
};


// ----------------------------- update by id -----------------------------


const deleteTopic = async (topicId: string) => {
    const deletedTopic: MainTopicModel = await MainTopic.findByIdAndDelete(topicId).select('-__v');
    return deletedTopic;
};



export default {
    createTopic,
    getById,
    getByName,
    getByNameAndClassRoom,
    getTopicsById,
    totalDocument,
    find,
    findWithPagination,
    updateById,
    deleteTopic,
};