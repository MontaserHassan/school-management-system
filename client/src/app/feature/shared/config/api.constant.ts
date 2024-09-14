import { environment } from '../../../../environments/environment';
import { URLSegment } from './url-segment.enum';

export class ApiConstant {
  static URL_BASE = environment.base_url + environment.api_prefix;
  static LOGIN = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Auth + 'login';
  static ADD_USER = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Auth + 'register';

  static ADD_SUBJECT = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Director + URLSegment.Subject ;
  static GET_SUBJECT_BY_ID = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Director + URLSegment.Subject + '/{id}';
  static GET_SUBJECT_LIST = ApiConstant.URL_BASE + URLSegment.User + URLSegment.Director + URLSegment.Subject ;
}
