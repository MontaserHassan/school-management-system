import { UserRole } from "../enums/user-role.enum";

export class RolesConstants {
  public static ADD_VIEW_List_SCHOOL = [
    UserRole.SuperAdmin,
  ];

  public static ADD_VIEW_List_USER = [
    UserRole.Admin,
  ];

  public static ADD_VIEW_List_SUBJECT = [
    UserRole.Admin,
    UserRole.Director,
    UserRole.Teacher
  ];

  public static ADD_VIEW_List_STUDENT = [
    UserRole.Admin,
    UserRole.Director,
    UserRole.Teacher
  ]

  public static ADD_VIEW_List_CLASS_ROOM = [
    UserRole.Admin,
    UserRole.Director,
    UserRole.Teacher
  ];
}
