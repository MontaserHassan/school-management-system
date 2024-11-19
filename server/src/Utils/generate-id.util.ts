import * as crypto from 'crypto';

const generateId = (): string => {
    const newId = crypto.randomBytes(12).toString('hex');
    return newId;
};


export default generateId;