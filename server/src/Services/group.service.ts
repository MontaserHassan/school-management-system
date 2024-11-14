import { Group, GroupModel } from '../Models/groups.model';



// ----------------------------- create group -----------------------------


const createGroup = async (groupName: string, schoolId: string, classes?: [{ classId: string, className: string }]) => {
    const group: GroupModel = new Group({
        groupName: groupName,
        schoolId: schoolId,
        classes: classes,
    });
    await group.save();
    return group;
};


// ----------------------------- find group by id -----------------------------


const findGroupById = async (groupId: string) => {
    const notification: GroupModel = await Group.findById(groupId).select('-__v');
    return notification;
};


// ----------------------------- find all -----------------------------


const findAllGroups = async (schoolId: string) => {
    const notifications: GroupModel[] = await Group.find({ schoolId }).select('-__v').sort({ createdAt: -1 });
    return notifications;
};

const addClassToGroup = async (groupId: string, classId: string, className: string) => {
    const group: GroupModel = await Group.findByIdAndUpdate(groupId, { classes: [{ classId: classId, className: className }] }, { new: true }).select('-__v');
    return group;
};



export default {
    createGroup,
    findGroupById,
    findAllGroups,
    addClassToGroup,
};