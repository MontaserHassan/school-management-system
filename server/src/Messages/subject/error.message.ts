enum errorSubjectMessage {
    SERVER = 'Internal Server Error',
    INVALID_DATA = 'The data is wrong or invalid',
    DOES_NOT_CREATED = "Subject doesn't created",
    DOES_NOT_UPDATED = "Subject doesn't updated",
    DOES_NOT_DELETED = "Subject doesn't deleted",
    NOT_FOUND_SUBJECT = 'This SUBJECT does not exist',
    NOT_UPDATED = 'Subject data does not update',
    SUBJECT_ALREADY_EXISTS = 'This subject already exists for this student',
    TEACHER_ALREADY_EXISTS = 'This teacher already exists for this subject',
    EXISTING_SUBJECT = 'This subject already exists, you can update on it',
};



export default errorSubjectMessage;