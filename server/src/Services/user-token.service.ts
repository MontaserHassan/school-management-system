import { UserToken, UserTokenModel } from "../Models/user-token.model";



// ----------------------------- saved token -----------------------------


const saveToken = async (secretKey: string, token: string, userId: string, expiryTime: Date) => {
    const newToken: UserTokenModel = new UserToken({
        secretKey: secretKey,
        token: token,
        userId: userId,
        expiryTime: expiryTime,
        endTime: expiryTime,
        active: true,
    });
    await newToken.save();
    return newToken;
};


// ----------------------------- get token -----------------------------


const getToken = async (userId: string) => {
    const currentTime = new Date();
    const token: UserTokenModel = await UserToken.findOne({ userId: userId, active: true, expiryTime: { $gt: currentTime } });
    return token;
};


// ----------------------------- stop token -----------------------------


const stopToken = async (secretKey: string) => {
    const stoppedToken: UserTokenModel = await UserToken.findOneAndUpdate({ secretKey: secretKey, active: true }, { active: false, endTime: new Date() }, { new: true });
    return stoppedToken;
};



export default {
    saveToken,
    getToken,
    stopToken,
};