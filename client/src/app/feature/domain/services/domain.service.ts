import { Injectable } from '@angular/core';
import { ApiBaseService } from '../../shared/services/general/api-base.service';
import { Mapper } from '../../shared/mapper/base-mapper.mapper';
import { ApiConstant } from '../../shared/config/api.constant';
import { filterNullEntity } from '../../shared/utils/filter-null-entity.util';
import { map, Observable } from 'rxjs';
import { IDomainPayload } from '../models/domain-payload';
import { Domain, DomainsList } from '../models/domain.model';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  constructor(
    private baseAPI: ApiBaseService,
    private mapper: Mapper
  ) { }

  addDomain(body:IDomainPayload):Observable<Domain> {
    return this.baseAPI.post(ApiConstant.ADD_SUBJECT, filterNullEntity(body)).pipe(
      map((res) => this.mapper.fromJson(Domain, res.data.domain))
    )
  }

  getDomainById(id:string):Observable<Domain> {
    return this.baseAPI.get(ApiConstant.GET_SUBJECT_BY_ID.replace('{id}',id)).pipe(
      map((res) => this.mapper.fromJson(Domain, res.data.domain))
    )
  }

  getDomains(params:{}):Observable<DomainsList> {
    return this.baseAPI.get(ApiConstant.GET_SUBJECT_LIST,{params}).pipe(
      map((res) => this.mapper.fromJson(DomainsList, res.data))
    )
  }

  editDomain(body: {domainName:string ,courseTime:string, domainId:string}):Observable<Domain> {
    return this.baseAPI.patch(ApiConstant.EDIT_SUBJECT, body).pipe(
      map((res) => this.mapper.fromJson(Domain, res.data.domain))
    )
  }
}
