import { Injectable } from '@angular/core';
import { ApiBaseService } from '../../shared/services/general/api-base.service';
import { Mapper } from '../../shared/mapper/base-mapper.mapper';
import { map, Observable } from 'rxjs';
import { EducationDomain } from '../models/cycle.model';
import { ApiConstant } from '../../shared/config/api.constant';

@Injectable({
  providedIn: 'root'
})
export class EducationDomainService {

  constructor(
    private baseAPI: ApiBaseService,
    private mapper: Mapper
  ) { }

  getAllEduDomains(schoolId?: string): Observable<EducationDomain[]> {
    return this.baseAPI.get(ApiConstant.GET_ALL_EDUCATION_DOMAINS.replace('{id}', schoolId || "" )).pipe(
      map((res) => this.mapper.fromJson(EducationDomain, res.data.educationDomains))
    )
  }

  addEduDomain(body: {
    educationDomainName: string,
    educationDomainDescription: string,
    domains: string[],
    cycleId: string,
    schoolId?: string
  }): Observable<EducationDomain> {
    return this.baseAPI.post(ApiConstant.ADD_EDUCATION_DOMAIN, body).pipe(
      map((res) => this.mapper.fromJson(EducationDomain, res.data.educationDomain))
    )
  }

  editEduDomain(body: {
    educationDomainName: string,
    educationDomainDescription: string,
    domains: string[],
    cycleId: string,
    schoolId?: string
  }): Observable<EducationDomain> {
    return this.baseAPI.patch(ApiConstant.EDIT_EDUCATION_DOMAIN, body).pipe(
      map((res) => this.mapper.fromJson(EducationDomain, res.data.educationDomain))
    )
  }
}
