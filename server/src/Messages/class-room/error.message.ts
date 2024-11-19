enum errorClassRoomMessage {
    DOES_NOT_CREATED = "Class Room doesn't created",
    DOES_NOT_UPDATED = "Class Room doesn't updated",
    DOES_NOT_DELETED = "Class Room doesn't deleted",
    NOT_FOUND_CLASS = 'This Class room does not exist',
    NOT_UPDATED = 'Class room data does not update',
    ROOM_ALREADY_TOKED = 'This room has already been taken',
    DUPLICATE_ROOM_VALUE = "Duplicate Room IDs found",
    NOT_FOUND_ROOM = "Room not found. Please check the room ID and try again.",
    ROOM_NOT_SCHOOL = "This Room is not belong to your school. Please check the Room ID and try again.",
    STUDENT_NOT_ADDED = "These students didn't add",
    SKILLS_NOT_ADDED = "These skills didn\'t add",
    TEACHER_ALREADY_ASSIGNED = "This teacher has already been assigned on other class",
    TEACHER_ALREADY_AT_CLASS = "This teacher has already been assigned on this class",
    NOT_TEACHER_AT_CLASS = "This teacher has not been assigned on any class",
    SKILL_EXISTING_IN_ROOM = "This skill has already been added in this room",
    TEACHER_NOT_FOUND = "Teacher not found. Please check the teacher ID and try again.",
    TEACHER_NOT_ADDED = "Teacher doesn't added.",
    STUDENT_NOT_DELETED = "These students didn't delete",
};



export default errorClassRoomMessage;