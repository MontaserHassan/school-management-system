import jwt from 'jsonwebtoken';

import calculateExpirationDate from './calculateExpirationDate';
import generateSecretKey from './createSecretKey.util';
// import { UserModel } from '../Models/user.model';



// -------------------------------------------- create user token --------------------------------------------


function createUserToken(user: any) {
    const expireDate = calculateExpirationDate(String(process.env.EXPIRESIN));
    const expiresInMilliseconds = Math.floor((expireDate.getTime() - new Date().getTime()) / 1000);
    const secretKey = generateSecretKey(12)
    const token = jwt.sign({ id: user._id, email: user.email, schoolId: user.schoolId, secretKey: secretKey, role: user.role, code: user.code }, process.env.JWT_SECRET as string, { expiresIn: expiresInMilliseconds });
    return { token: token, expireDate: expireDate, secretKey: secretKey };
};



export default {
    createUserToken,
};