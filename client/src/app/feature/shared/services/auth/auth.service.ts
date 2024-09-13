import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtDecoderService } from './jwt-decoder.service';
import { map, tap } from 'rxjs/operators';
import { ApiBaseService } from '../general/api-base.service';
import { ApiConstant } from '../../config/api.constant';
import { filterNullEntity } from '../../utils/filter-null-entity.util';
import { AuthResponse, User } from '../../models/user.model';
import { JWTTokenValidation } from '../../enums/JWT-token-validation.enum';
import { Mapper } from '../../mapper/base-mapper.mapper';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser$: BehaviorSubject<AuthResponse> = new BehaviorSubject(new AuthResponse());
  public redirectionURL = '';

  constructor(
    private baseAPI: ApiBaseService,
    private mapper: Mapper,
    private jwtDecoderService: JwtDecoderService,
  ) {
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

  addUser(body: User): Observable<any> {
    return this.baseAPI.post(ApiConstant.ADD_USER, filterNullEntity(body)).pipe(
      map((res) => res)
    );
  }

  private saveTokenAndUpdateUser(user: AuthResponse): void {
    this.jwtDecoderService.saveToken(user.toJson!());
    this.currentUser$.next(this.jwtDecoderService.getCurrentUserFromJWTToken());
  }
}
