import AppDataSource from '../Config/orm.config';
import { User, UserModel } from "../Models/user.model";
import generateCode from "../Utils/generateCode.util";
import generatePassword from "../Utils/generate-password.util";



// ----------------------------- create user -----------------------------


const createUser = async (userName: string, email: string, role: string) => {
    const newCode = generateCode();
    const password = generatePassword(10);
    const newUser = new User({
        userName: userName,
        email: email,
        role: role,
        code: newCode,
        password: password
    });
    await newUser.save();
    return newUser;
};


// ----------------------------- get user by email -----------------------------


const getUserByEmail = async (email: string) => {
    const user = await User.findOne({ email }).select('-__v');
    return user;
};


// ----------------------------- update user -----------------------------


const updateUser = async (id: string, fulName: string, email: string) => {
    const updatedUser = await User.findByIdAndUpdate({ id }, { fulName: fulName, email: email, }, { new: true }).select('-__v');
    return updatedUser;
};


// ----------------------------- update user -----------------------------


const updateUserPassword = async (id: string, newPassword: string) => {
    const updatedUser = await User.findById(id);
    updatedUser.password = newPassword;
    updatedUser.updatePassword = true;
    await updatedUser.save();
    return updatedUser;
};


// ----------------------------- verify password -----------------------------


const verifyPassword = async (id: string, password: string) => {
    const user = await User.findById(id).select('-__v');
    if (!user) return false;
    const isVerifyPassword = user.verifyPassword(password);
    return isVerifyPassword;
};



// ----------------------------- update logged -----------------------------


const updateLogged = async (id: string, state: boolean) => {
    const user = await User.findByIdAndUpdate(id, { logged: state, lastSeen: new Date() }, { new: true }).select('-__v');
    return user;
};


// ----------------------------- get by id -----------------------------


const getById = async (id: string) => {
    const user = await User.findById(id).select('-__v');
    return user;
};


// ----------------------------- get user by ids and role -----------------------------


const getUserByIdAsTeacher = async (id: string[]) => {
    const user = await User.find({ _id: { $in: id }, role: 'teacher' }).select('-__v');
    return user;
};



// ----------------------------- get user by ids and role -----------------------------


const getTeachers = async () => {
    const teachers: UserModel[] = await User.find({ role: 'teacher' }).select('_id userName');
    return teachers;
};




export default {
    createUser,
    getById,
    getUserByIdAsTeacher,
    getUserByEmail,
    getTeachers,
    updateUser,
    updateUserPassword,
    verifyPassword,
    updateLogged,
};