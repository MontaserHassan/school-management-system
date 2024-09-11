enum errorClassRoomMessage {
    DOES_NOT_CREATED = "Class Room doesn't created",
    DOES_NOT_UPDATED = "Class Room doesn't updated",
    DOES_NOT_DELETED = "Class Room doesn't deleted",
    NOT_FOUND_SUBJECT = 'This Class room does not exist',
    NOT_UPDATED = 'Class room data does not update',
    ROOM_ALREADY_TOKED = 'This room has already been taken',
    DUPLICATE_ROOM_VALUE = "Duplicate Room IDs found",
    NOT_FOUND_ROOM = "Room not found. Please check the room ID and try again.",
    STUDENT_NOT_ADDED = "These students didn't add",
    TOPIC_NOT_ADDED = "These topics didn\'t add",
    TEACHER_ALREADY_ASSIGNED = "This teacher has already been assigned on other class",
    NOT_TEACHER_AT_CLASS = "This teacher has not been assigned on any class",
    TOPIC_EXISTING_IN_ROOM = "This topic has already been added in this room",
};



export default errorClassRoomMessage;