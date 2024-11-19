import AppDataSource from '../Config/orm.config';
import { User, UserModel } from "../Models/user.model";
import generateCode from "../Utils/generateCode.util";
import generatePassword from "../Utils/generate-password.util";



// ----------------------------- create user -----------------------------


const createUser = async (userName: string, email: string, role: string, schoolId: string, media: string, termsAndCondition?: boolean) => {
    const newCode = generateCode();
    const password = generatePassword(10);
    const newUser: UserModel = new User({
        userName: userName,
        email: email,
        role: role,
        code: newCode,
        password: password,
        schoolId: schoolId,
        media: media,
        termsAndCondition: termsAndCondition
    });
    await newUser.save();
    return newUser;
};


// ----------------------------- find users by role -----------------------------


const findUserById = async (role: string, schoolId: string) => {
    const users: UserModel[] = await User.find({ schoolId, role }).select('-__v');
    return users;
};


// ----------------------------- get total documents -----------------------------


const totalDocument = async (condition?: string, value?: string) => {
    const query = { [condition]: value };
    const user = await User.countDocuments(query);
    return user;
};


// ----------------------------- find all with pagination -----------------------------


const findAllUserOfSchoolLookup = async (schoolId: string) => {
    const users: UserModel[] = await User.find({ schoolId }).select('-__v');
    return users;
};


const findAllUserOfSchool = async (schoolId: string, limit: number, skip: number) => {
    const users: UserModel[] = await User.find({ schoolId }).limit(limit).skip(skip).select('-__v');
    return users;
};


// ----------------------------- find specific user at school -----------------------------


const findSpecificUserOfSchool = async (role: string, schoolId: string) => {
    const users: UserModel[] = await User.find({ role: role, schoolId: schoolId }).select('-__v');
    return users;
};


// ----------------------------- find all with pagination -----------------------------


const findUserByRole = async (role: string) => {
    const users: UserModel[] = await User.find({ role: role }).select('-__v');
    return users;
};

// ----------------------------- get all users -----------------------------


const getAllUsers = async () => {
    const users: UserModel[] = await User.find({}).select('-__v');
    return users;
};


// ----------------------------- get user by email -----------------------------


const getUserByEmail = async (email: string) => {
    const user = await User.findOne({ email }).select('-__v');
    return user;
};


// ----------------------------- update user -----------------------------


const updateUser = async (id: string, updatedData: any) => {
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true }).select('-__v');
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


// ----------------------------- get by code -----------------------------


const getByCode = async (code: string) => {
    const user = await User.findOne({ code }).select('-__v');
    return user;
};


// ----------------------------- get user by ids and role -----------------------------


const getUserByIdAsTeacher = async (id: string[]) => {
    const user = await User.find({ _id: { $in: id }, role: 'teacher' }).select('-__v');
    return user;
};



// ----------------------------- delete Users -----------------------------


const deleteUsers = async (employees: string[]) => {
    const deleteEmployees = await User.deleteMany({ _id: { $in: employees } });
    return deleteEmployees;
};



export default {
    createUser,
    totalDocument,
    findAllUserOfSchool,
    findAllUserOfSchoolLookup,
    findUserByRole,
    findSpecificUserOfSchool,
    findUserById,
    getAllUsers,
    getById,
    getByCode,
    getUserByEmail,
    getUserByIdAsTeacher,
    updateUser,
    updateUserPassword,
    verifyPassword,
    updateLogged,
    deleteUsers,
};