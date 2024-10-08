import { environment } from '../../../../environments/environment';
import { URLSegment } from './url-segment.enum';

export class ApiConstant {
  static URL_BASE = environment.base_url + environment.api_prefix;
  static LOGIN = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Auth + 'login';
  static UPDATE_PASSWORD = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Auth + 'add-password';
  static ADD_USER = ApiConstant.URL_BASE + URLSegment.User + 'register';
  static UPDATE_USER = ApiConstant.URL_BASE + URLSegment.User ;
  static RESET_PASSWORD = ApiConstant.URL_BASE + URLSegment.User + 'update-password';

  static GET_SCHOOLS = ApiConstant.URL_BASE + URLSegment.User + 'school';
  static ADD_SCHOOL = ApiConstant.URL_BASE + URLSegment.User + 'school';
  static EDIT_SCHOOL = ApiConstant.URL_BASE + URLSegment.User + 'school';
  static GET_SCHOOL_BY_ID = ApiConstant.URL_BASE + URLSegment.User + 'school/' + '{id}';

  static GET_USERS_LIST = ApiConstant.URL_BASE + URLSegment.User + 'user-list';
  static GET_USER_PROFILE = ApiConstant.URL_BASE + URLSegment.User + 'profile';

  static ADD_SUBJECT = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Subject ;
  static GET_SUBJECT_BY_ID = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Subject + '{id}';
  static GET_SUBJECT_LIST = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Subject ;
  static EDIT_SUBJECT = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Subject ;

  static GET_LOOKUP = ApiConstant.URL_BASE +  URLSegment.Lookups + '{type}';

  static GET_CLASS_ROOMS = ApiConstant.URL_BASE + URLSegment.User  + URLSegment.classRoom
  static ADD_CLASS_ROOM = ApiConstant.URL_BASE + URLSegment.User  + URLSegment.classRoom;
  static EDIT_CLASS_ROOM = ApiConstant.URL_BASE + URLSegment.User  + URLSegment.classRoom;
  static GET_CLASS_ROOM_BY_ID = ApiConstant.URL_BASE + URLSegment.User + URLSegment.classRoom + '{id}';
  static DELETE_CLASS_ROOM_BY_ID = ApiConstant.URL_BASE + URLSegment.User + URLSegment.classRoom + '{id}';
  static ADD_STUDENT_TO_CLASS = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Student + 'add-data';
  static DELETE_STUDENT_FROM_CLASS = ApiConstant.URL_BASE + URLSegment.User + URLSegment.classRoom + 'unAssign-student';

  static ADD_TOPIC = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Teacher + 'topic';
  static EDIT_TOPIC = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Teacher + 'topic';
  static GET_TOPICS = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Teacher + 'topic';

  static ADD_PARENT = ApiConstant.URL_BASE + URLSegment.User + 'add-parent';
  static GET_PARENTS = ApiConstant.URL_BASE + URLSegment.User + 'parents';
  static GET_STUDENT_BY_PARENT_ID = ApiConstant.URL_BASE + URLSegment.User + URLSegment.parent  + '{id}'
  static ADD_STUDENT = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Student;

  static GET_STUDENTS = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Student;
  static GET_STUDENTS_BY_ID = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Student + '{id}';
  static UPDATE_STUDENT = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Student;

  static UPDATE_STUDENT_PROGRESS_STATUS = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Student + 'progress-status';
  static ADD_ATTENDANCE = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Student + 'attendance';
  static ADD_COMMENT = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Student + 'comment';
  static UPDATE_STUDENT_DEGREE = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Student + 'degree';
}
