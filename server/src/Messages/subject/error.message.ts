enum errorSubjectMessage {
    SERVER = 'Internal Server Error',
    INVALID_DATA = 'The data is wrong or invalid',
    DOES_NOT_CREATED = "Subject doesn't created",
    DOES_NOT_UPDATED = "Subject doesn't updated",
    DOES_NOT_DELETED = "Subject doesn't deleted",
    NOT_FOUND_SUBJECT = 'This Subject does not exist',
    NOT_UPDATED = 'Subject data does not update',
    SUBJECT_ALREADY_EXISTS = 'This Subject already exists for this student',
    TEACHER_ALREADY_EXISTS = 'This teacher already exists for this Subject',
    EXISTING_SUBJECT = 'This Subject already exists, you can update on it',
};



export default errorSubjectMessage;