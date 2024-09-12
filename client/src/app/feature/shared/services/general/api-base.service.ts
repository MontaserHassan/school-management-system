import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LanguageEnum } from '../../enums/language.enum';
import {
  AppError,
  BadInputError,
  ConflictError,
  IneligibleError,
  NoDataError,
  NotFoundError,
  PreconditionError,
} from '../../errors';
import { environment } from '../../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ApiBaseService {
  private baseEnvUrl = environment.base_url;
  private baseApiUrl = this.baseEnvUrl;
  constructor(private http: HttpClient, private translate: TranslateService) {}

  setBaseUrl(url:string) {
    this.baseApiUrl = url;
  }

  public get(url: string, options?: any): Observable<any> {
    if (options) {
      options.observe = 'response';
      options.headers = options.headers || this.getHeaders();
    } else {
      options = {
        observe: 'response',
        headers: this.getHeaders(),
      };
    }

    return this.http.get(this.encodeURL(this.switchUrlBase(url)), options).pipe(
      map((response: any) => {
        if (response.status === 204) {
          throw new NoDataError();
        } else {
          return response.body;
        }
      }),
      catchError(this.handleError)
    );
  }

  public post(url: string, body: any, options?: any): Observable<any> {
    if (!options) {
      options = {
        headers: this.getHeaders(),
      };
    } else {
      options.headers = this.getHeaders();
    }

    console.log(this.encodeURL(this.switchUrlBase(url)), body, options);

    return this.http
      .post(this.encodeURL(this.switchUrlBase(url)), body, options)
      .pipe(catchError(this.handleError));
  }

  public put(url: string, body: any, options?: any): Observable<any> {
    if (!options) {
      options = {
        headers: this.getHeaders(),
      };
    } else {
      options.headers = this.getHeaders();
    }

    return this.http
      .put(this.encodeURL(this.switchUrlBase(url)), body, options)
      .pipe(catchError(this.handleError));
  }

  public delete(url: string, options?: any): Observable<any> {
    if (!options) {
      options = {
        headers: this.getHeaders(),
      };
    } else {
      options.headers = this.getHeaders();
    }

    return this.http
      .delete(this.encodeURL(this.switchUrlBase(url)), options)
      .pipe(catchError(this.handleError));
  }

  public patch(url: string, body: any, options?: any): Observable<any> {
    if (!options) {
      options = {
        headers: this.getHeaders(),
      };
    } else {
      options.headers = this.getHeaders();
    }

    return this.http
      .patch(this.encodeURL(this.switchUrlBase(url)), body, options)
      .pipe(catchError(this.handleError));
  }

  public getHeaders(acceptLanguage?: string): HttpHeaders {
    if (!acceptLanguage) {
      if (this.translate.currentLang) {
        acceptLanguage = this.translate.currentLang;
      } else {
        acceptLanguage = LanguageEnum.English;
      }
    }

    return new HttpHeaders({
      'Accept-Language': acceptLanguage,
    });
  }

  public encodeURL(url: string): string {
    return url.replace(' ', '%20');
  }

  // TODO: check again
  public getQueryParams(params:any): HttpParams {
    let _params = new HttpParams();
    if (params) {
      for (let d in params) _params = _params.append(d, params[d]);
    }
    return _params;
  }

  handleError(response: any) {
    if (response.status === 400) {
      return throwError(new BadInputError(response.error.errors, response.status));
    } else if (response.status === 404) {
      return throwError(new NotFoundError(response.error.errors, response.status));
    } else if (response.status === 403) {
      return throwError(new IneligibleError(response.error.errors, response.status));
    } else if (response.status === 409) {
      return throwError(new ConflictError(response.error.errors));
    } else if (response.status === 204) {
      return throwError(new NoDataError(response.error.errors, response.status));
    } else if (response.status === 412) {
      return throwError(new PreconditionError(response.error.errors, response.status));
    } else if (response.status === 0 || response.status === -1) {
      return throwError(new AppError(['Disconnected, Please check network and try again']));
    }
    return throwError(
      new AppError(response.error ? response.error.errors : response.errors, response.status)
    );
  }

  switchUrlBase(url: string): string {
    const baseUrl = this.baseApiUrl.replace(/\/+$/, '');
    const envBaseUrl = this.baseEnvUrl.replace(/\/+$/, '');

    if (!url.includes(envBaseUrl)) {
      return url;
    }

    return url.replace(envBaseUrl, baseUrl || envBaseUrl);
  }
}
