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


const findAllGroups = async () => {
    const notifications: GroupModel[] = await Group.find().select('-__v').sort({ createdAt: 1 });
    return notifications;
};



export default {
    createGroup,
    findGroupById,
    findAllGroups,
};