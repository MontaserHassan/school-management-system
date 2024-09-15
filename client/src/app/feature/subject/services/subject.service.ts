import { Injectable } from '@angular/core';
import { ApiBaseService } from '../../shared/services/general/api-base.service';
import { Mapper } from '../../shared/mapper/base-mapper.mapper';
import { ApiConstant } from '../../shared/config/api.constant';
import { filterNullEntity } from '../../shared/utils/filter-null-entity.util';
import { map, Observable } from 'rxjs';
import { ISubjectPayload } from '../models/sybject-payload';
import { Subject, SubjectsList } from '../models/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(
    private baseAPI: ApiBaseService,
    private mapper: Mapper
  ) { }

  addSubject(body:ISubjectPayload):Observable<Subject> {
    return this.baseAPI.post(ApiConstant.ADD_SUBJECT, filterNullEntity(body)).pipe(
      map((res) => this.mapper.fromJson(Subject, res.data.subject))
    )
  }

  getSubjectById(id:string):Observable<Subject> {
    return this.baseAPI.get(ApiConstant.GET_SUBJECT_BY_ID.replace('{id}',id)).pipe(
      map((res) => this.mapper.fromJson(Subject, res.data.subject))
    )
  }

  getSubjects():Observable<SubjectsList> {
    return this.baseAPI.get(ApiConstant.GET_SUBJECT_LIST).pipe(
      map((res) => this.mapper.fromJson(SubjectsList, res.data))
    )
  }
}
