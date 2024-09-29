import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtDecoderService } from './jwt-decoder.service';
import { map, tap } from 'rxjs/operators';
import { ApiBaseService } from '../general/api-base.service';
import { ApiConstant } from '../../config/api.constant';
import { filterNullEntity } from '../../utils/filter-null-entity.util';
import { AuthResponse, User, UsersList } from '../../models/user.model';
import { JWTTokenValidation } from '../../enums/JWT-token-validation.enum';
import { Mapper } from '../../mapper/base-mapper.mapper';
import { BaseComponent } from '../../component/base-component/base.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseComponent {
  public currentUser$: BehaviorSubject<AuthResponse> = new BehaviorSubject(new AuthResponse());
  public redirectionURL = '';

  constructor(
    private baseAPI: ApiBaseService,
    private mapper: Mapper,
    private jwtDecoderService: JwtDecoderService,
  ) {
    super();
    if (this.jwtDecoderService.isThereValidToken() === JWTTokenValidation.Valid) {
      this.currentUser$.next(this.jwtDecoderService.getCurrentUserFromJWTToken());
    }
  }

  isLoggedIn(): boolean {
    return this.jwtDecoderService.isThereValidToken() !== JWTTokenValidation.NotFound;
  }

  login(body:{email: string, password: string}): Observable<AuthResponse> {

    return this.baseAPI.post(ApiConstant.LOGIN, filterNullEntity(body)).pipe(
      map((res) => this.mapper.fromJson(AuthResponse, res.data)),
      tap((user) => {
        return this.saveTokenAndUpdateUser(user)
      })
    );
  }

  updatePassword(body: {email: string, password: string}): Observable<User> {
    return this.baseAPI.post(ApiConstant.UPDATE_PASSWORD, filterNullEntity(body)).pipe(
      tap((res) => this.showSuccessMessage(res.responseMessage)),
      map((res) => this.mapper.fromJson(User, res.data.user))
    );
  }

  getUserProfile(id: string): Observable<User> {
    return this.baseAPI.get(ApiConstant.GET_USER_PROFILE, {params:{id}}).pipe(
      map((res) => this.mapper.fromJson(User, res.data.user))
    );
  }

  getUsersList(params:{}): Observable<UsersList> {
    return this.baseAPI.get(ApiConstant.GET_USERS_LIST,{params}).pipe(
      map((res) => this.mapper.fromJson(UsersList, res.data)));
  }

  addUser(body: User): Observable<User> {
    return this.baseAPI.post(ApiConstant.ADD_USER, filterNullEntity(body)).pipe(
      map((res) => this.mapper.fromJson(User, res.data.user))
    );
  }

  private saveTokenAndUpdateUser(user: AuthResponse): void {
    this.jwtDecoderService.saveToken(user.toJson!());
    this.currentUser$.next(this.jwtDecoderService.getCurrentUserFromJWTToken());
  }
}
