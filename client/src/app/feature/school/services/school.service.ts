import { Injectable } from '@angular/core';
import { Mapper } from '../../shared/mapper/base-mapper.mapper';
import { ApiBaseService } from '../../shared/services/general/api-base.service';
import { ApiConstant } from '../../shared/config/api.constant';
import { map, Observable } from 'rxjs';
import { School, SchoolList } from '../models/school.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(
    private baseAPI: ApiBaseService,
    private mapper: Mapper
  ) { }

  addSchool(body: {
    schoolName: string,
    subscriptionFees: string,
    admin: {
        userName: string,
        email: string
    },
    subscriptionWay: string,
    currencyOfSubscription: string,
    employees?: []
  }): Observable<School> {
    return this.baseAPI.post(ApiConstant.ADD_SCHOOL, body).pipe(
      map((res) => this.mapper.fromJson(School, res.data.school))
    )
  }

  editSchool(body: {
    schoolId: string,
    schoolName?: string,
    subscriptionFees?: string,
    subscriptionWay?: string,
    currencyOfSubscription?: string,
  }): Observable<School> {
    return this.baseAPI.patch(ApiConstant.EDIT_SCHOOL, body).pipe(
      map((res) => this.mapper.fromJson(School, res.data.school))
    )
  }

  getSchoolDetails(id:string): Observable<School> {
    return this.baseAPI.get(ApiConstant.GET_SCHOOL_BY_ID.replace('{id}', id)).pipe(
      map((res) => this.mapper.fromJson(School, res.data.school))
    )
  }

  getSchools(params:{}): Observable<SchoolList> {
    return this.baseAPI.get(ApiConstant.GET_SCHOOLS,{params}).pipe(
      map((res) => this.mapper.fromJson(SchoolList, res.data))
    )
  }
}
