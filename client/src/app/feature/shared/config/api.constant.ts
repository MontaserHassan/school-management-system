import { environment } from '../../../../environments/environment';
import { URLSegment } from './url-segment.enum';

export class ApiConstant {
  static URL_BASE = environment.base_url + environment.api_prefix;
  static LOGIN = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Auth + 'login';
  static UPDATE_PASSWORD = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Auth + 'add-password';
  static ADD_USER = ApiConstant.URL_BASE + URLSegment.User + 'register';

  static GET_SCHOOLS = ApiConstant.URL_BASE + URLSegment.User + URLSegment.SuperAdmin  + 'school';
  static ADD_SCHOOL = ApiConstant.URL_BASE + URLSegment.User + URLSegment.SuperAdmin  + 'school';
  static GET_SCHOOL_BY_ID = ApiConstant.URL_BASE + URLSegment.User + URLSegment.SuperAdmin + 'school/' + '{id}';

  static GET_USERS_LIST = ApiConstant.URL_BASE + URLSegment.User + 'user-list';
  static GET_USER_PROFILE = ApiConstant.URL_BASE + URLSegment.User + 'profile';

  static ADD_SUBJECT = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Subject ;
  static GET_SUBJECT_BY_ID = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Subject + '{id}';
  static GET_SUBJECT_LIST = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Subject ;

  static GET_LOOKUP = ApiConstant.URL_BASE +  URLSegment.Lookups + '{type}';

  static GET_CLASS_ROOMS = ApiConstant.URL_BASE + URLSegment.User  + URLSegment.classRoom
  static ADD_CLASS_ROOM = ApiConstant.URL_BASE + URLSegment.User  + URLSegment.classRoom;
  static GET_CLASS_ROOM_BY_ID = ApiConstant.URL_BASE + URLSegment.User + URLSegment.classRoom + '{id}';
  static ADD_STUDENT_TO_CLASS = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Student + 'add-data';

  static ADD_TOPIC = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Teacher + 'topic';
  static GET_TOPICS = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Teacher + 'topic';

  static ADD_PARENT = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Auth + 'add-parent';
  static GET_PARENTS = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Auth + 'parents';
  static GET_STUDENTS_BY_PARENTS = ApiConstant.URL_BASE + URLSegment.User + URLSegment.parent + 'get'
  static ADD_STUDENT = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Student ;

  static GET_STUDENTS = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Student ;
  static GET_STUDENTS_BY_ID = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Student + '{id}';

  static ADD_ATTENDANCE = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Student + 'attendance';
  static ADD_COMMENT = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Student + 'comment';
  static ADD_DEGREE = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Student + 'degree';
}
