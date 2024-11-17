import { Skill, SkillModel } from '../Models/skill.model';



// ----------------------------- create skill -----------------------------


const createSkill = async (skillId: string, skillName: string, room: string, domainId: string, domainName: string, schoolId: string) => {
    const newSkill: SkillModel = new Skill({
        skillId: skillId,
        skillName: (skillName).toLowerCase(),
        domainId: domainId,
        domainName: domainName,
        schoolId: schoolId,
        classRoom: room,
    });
    await newSkill.save();
    return newSkill;
};


// ----------------------------- get by name -----------------------------


const getByName = async (skillName: string) => {
    const skill: SkillModel = await Skill.findOne({ skillName }).select('-__v');
    return skill;
};


// ----------------------------- get by name and class room -----------------------------


const getByNameAndClassRoom = async (skillName: string, classRoom: string, schoolId) => {
    const skill: SkillModel = await Skill.findOne({ skillName, classRoom, schoolId }).select('-__v');
    return skill;
};


// ----------------------------- get by domain id -----------------------------


const getByDomainId = async (domainId: string) => {
    const skills: SkillModel[] = await Skill.find({ domainId: domainId }).select('-__v');
    return skills;
};


// ----------------------------- get by domain id -----------------------------


const getLengthSkills = async (domainId: string) => {
    const skills = await Skill.countDocuments({ domainId: domainId });
    return skills;
};


// ----------------------------- get by id -----------------------------


const getById = async (skillId: string) => {
    const skill: SkillModel = await Skill.findById(skillId).select('-__v');
    return skill;
};


// ----------------------------- get skills by skill id -----------------------------


const getSkillsById = async (id: string[]) => {
    const user = await Skill.find({ _id: { $in: id } }).select('-__v');
    return user;
};


// ----------------------------- total document -----------------------------


const totalDocument = async (schoolId: string) => {
    const skills = await Skill.countDocuments({ schoolId });
    return skills;
};


// ----------------------------- find all with pagination -----------------------------


const findWithPagination = async (schoolId: string, limit: number, skip: number) => {
    const skills: SkillModel[] = await Skill.find({ schoolId: schoolId }).limit(limit).skip(skip).select('-__v');
    return skills;
};


// ----------------------------- find all  -----------------------------


const getAllSkillsLookups = async (schoolId: string) => {
    const skill: SkillModel[] = await Skill.find({ schoolId }).select('-__v');
    return skill;
};


// ----------------------------- update by id -----------------------------


const updateById = async (skillId: string, updatedData: any) => {
    const updatedSkill: SkillModel = await Skill.findByIdAndUpdate(skillId, updatedData, { new: true }).select('-__v');
    return updatedSkill;
};


// ----------------------------- update by id -----------------------------


const deleteSkill = async (skillId: string) => {
    const deletedSkill: SkillModel = await Skill.findByIdAndDelete(skillId).select('-__v');
    return deletedSkill;
};



export default {
    createSkill,
    getById,
    getByDomainId,
    getByName,
    getLengthSkills,
    getByNameAndClassRoom,
    getSkillsById,
    totalDocument,
    getAllSkillsLookups,
    findWithPagination,
    updateById,
    deleteSkill,
};