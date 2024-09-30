enum errorStudentMessage {
    SERVER = 'Internal Server Error',
    INVALID_DATA = 'The data is wrong or invalid',
    DOES_NOT_CREATED = "Student doesn't created",
    DOES_NOT_UPDATED = "Student doesn't updated",
    DOES_NOT_DELETED = "Student doesn't deleted",
    NOT_FOUND_STUDENT = 'This Student does not exist',
    NOT_UPDATED = 'Student data does not update',
    EXISTING_STUDENT = 'This student already exists in this class, you can\'t add him again',
    LOOKUPS_NOT_EXISTING = "Lookups does not exist",
    PARENT_NOT_EXIST = "Parent does not exist",
    SUBJECT_NOT_EXISTING = "This Subject does not exist for this student",
    STUDENT_AND_TEACHER = "This Teacher Is NOT assigned to this student, you can't add a comment for this student",
    TOPIC_WITHOUT_DEGREE = "Cannot complete subject because some topics have no degree."
};



export default errorStudentMessage;