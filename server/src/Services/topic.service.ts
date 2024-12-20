import { MainTopic, MainTopicModel } from '../Models/main-topics.model';



// ----------------------------- create topic -----------------------------


const createTopic = async (topicName: string) => {
    const newTopic: MainTopicModel = new MainTopic({
        topicName: (topicName).toLowerCase(),
    });
    await newTopic.save();
    return newTopic;
};


// ----------------------------- get by id -----------------------------


const getByName = async (topicName: string) => {
    const subject: MainTopicModel = await MainTopic.findOne({ topicName }).select('-__v');
    return subject;
};


// ----------------------------- get by id -----------------------------


const getById = async (topicId: string) => {
    const topic: MainTopicModel = await MainTopic.findById(topicId).select('-__v');
    return topic;
};


// ----------------------------- total document -----------------------------


const totalDocument = async () => {
    const mainTopics = await MainTopic.countDocuments();
    return mainTopics;
};


// ----------------------------- find all with pagination -----------------------------


const findWithPagination = async (limit: number, skip: number) => {
    const mainTopics: MainTopicModel[] = await MainTopic.find().limit(limit).skip(skip).select('-__v');
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
    totalDocument,
    find,
    findWithPagination,
    updateById,
    deleteTopic,
};