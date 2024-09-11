enum errorStudentMessage {
    SERVER = 'Internal Server Error',
    INVALID_DATA = 'The data is wrong or invalid',
    DOES_NOT_CREATED = "Student doesn't created",
    DOES_NOT_UPDATED = "Student doesn't updated",
    DOES_NOT_DELETED = "Student doesn't deleted",
    NOT_FOUND_STUDENT = 'This account does not exist',
    NOT_UPDATED = 'Student data does not update',
    EXISTING_STUDENT = 'This student already exists in this class, you can\'t add him again',
};



export default errorStudentMessage;