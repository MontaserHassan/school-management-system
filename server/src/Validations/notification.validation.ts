import Joi from 'joi';



const notificationValidator = {
    getNotification: {
        params: Joi.object().keys({
            notificationId: Joi.string().required().trim().messages({ 'string.empty': 'Notification Id is required.', }),
        }),
    },
};



export {
    notificationValidator,
};