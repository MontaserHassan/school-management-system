enum errorStudentMessage {
    DOES_NOT_CREATED = "Student doesn't created",
    DOES_NOT_UPDATED = "Student doesn't updated",
    DOES_NOT_DELETED = "Student doesn't deleted",
    NOT_FOUND_STUDENT = 'This Student does not exist',
    NOT_UPDATED = 'Student data does not update',
    EXISTING_STUDENT = 'This student already exists in this class, you can\'t add him again',
    STUDENT_ASSIGNED_TO_CLASS = "This student is already assigned to class",
    LOOKUPS_NOT_EXISTING = "Lookups does not exist",
    PARENT_NOT_EXIST = "Parent does not exist",
    DOMAIN_NOT_EXISTING = "This Domain does not exist for this student",
    STUDENT_AND_TEACHER = "This Teacher Is NOT assigned to this student, you can't add a comment for this student",
    SKILL_WITHOUT_DEGREE = "Cannot complete domain because some skills have no degree.",
    PROGRESS_HISTORY_DOES_NOT_CREATED = "Progress history does not created, because some skills or activities have no degree.",
};



export default errorStudentMessage;