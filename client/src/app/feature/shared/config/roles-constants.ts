import { UserRole } from "../enums/user-role.enum";

export class RolesConstants {
  //school
  public static ADD_VIEW_List_SCHOOL = [
    UserRole.SuperAdmin,
  ];

  public static VIEW_SCHOOL_BUTTON =[
    UserRole.Admin,
    UserRole.SuperAdmin
  ]

  //user
  public static ADD_VIEW_List_USER = [
    UserRole.Admin,
    UserRole.Director,
  ];

  //subject
  public static ADD_VIEW_List_SUBJECT = [
    UserRole.Admin,
    UserRole.Director,
  ];

  //student
  public static VIEW_List_STUDENT = [
    UserRole.Admin,
    UserRole.Director,
    UserRole.Teacher,
    UserRole.Parent
  ]

  public static ADD_STUDENT = [
    UserRole.Admin,
    UserRole.Director,
  ]

  public static ADD_PROGRESS_AND_DEGREE = [
    UserRole.Teacher
  ]

  public static VIEW_PROGRESS_AND_DEGREE = [
    UserRole.Admin,
    UserRole.Director,
    UserRole.Parent
  ]

  public static ADD_ATTENDANCE_AND_COMMENT = [
    UserRole.Teacher,
    UserRole.Admin,
    UserRole.Director
  ]

  public static EDIT_STUDENT = [
    UserRole.Admin,
    UserRole.Director
  ]

  public static ADD_STUDENT_TO_CLASSROOM = [
    UserRole.Admin,
    UserRole.Director
  ]

  //classroom
  public static VIEW_List_CLASS_ROOM = [
    UserRole.Admin,
    UserRole.Director,
    UserRole.Teacher
  ];

  public static ADD_CLASS_ROOM = [
    UserRole.Admin,
    UserRole.Director,
  ];

  public static EDIT_DELETE_CLASS_ROOM = [
    UserRole.Admin,
    UserRole.Director
  ]

  //topic
  public static VIEW_TOPIC = [
    UserRole.Admin,
    UserRole.Director,
    UserRole.Teacher
  ];

  public static ADD_Edit_TOPIC = [
    UserRole.Teacher
  ]
}
