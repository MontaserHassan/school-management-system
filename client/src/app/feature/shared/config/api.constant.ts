import { environment } from '../../../../environments/environment';
import { URLSegment } from './url-segment.enum';

export class ApiConstant {
  static URL_BASE = environment.base_url + environment.api_prefix;
  static LOGIN = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Auth + 'login';
  
  static ADD_USER = ApiConstant.URL_BASE + URLSegment.User + 'register';
  static GET_USERS_LIST = ApiConstant.URL_BASE + URLSegment.User + 'list';
  static GET_USER_PROFILE = ApiConstant.URL_BASE + URLSegment.User + 'profile/' + '{id}';

  static ADD_SUBJECT = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Director + URLSegment.Subject ;
  static GET_SUBJECT_BY_ID = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Director + URLSegment.Subject + '{id}';
  static GET_SUBJECT_LIST = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Director + URLSegment.Subject ;

  static GET_LOOKUP = ApiConstant.URL_BASE +  URLSegment.Lookups + '{type}';


  static GET_CLASS_ROOMS = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Director  + 'class-room';
  static ADD_CLASS_ROOM = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Director  + 'class-room';
  static GET_CLASS_ROOM_BY_ID = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Director+ 'class-room/' + '{id}';

}
