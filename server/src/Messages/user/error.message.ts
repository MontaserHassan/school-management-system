enum ErrorUserMessage {
    SERVER = 'Internal Server Error',
    INVALID_DATA = 'The data is wrong or invalid',
    DOES_NOT_CREATED = "User doesn't created",
    doesNotUpdated = "User doesn't updated",
    doesNotDeleted = "User doesn't deleted",
    EMAIL_EXISTS = 'This is Email already exists',
    NOT_FOUND_USER = 'This account does not exist',
    NOT_UPDATED = 'User data does not update',
    WRONG_CREDENTIALS = 'This credentials is wrong',
    SAME_PASSWORD = "Old password and new password are same",
    UPDATE_PASSWORD = 'You need to update your password',
    PASSWORD_ALREADY_UPDATED = 'You have already updated your password.',
};



export default ErrorUserMessage;