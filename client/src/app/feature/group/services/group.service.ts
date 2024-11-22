import { Injectable } from '@angular/core';
import { ApiBaseService } from '../../shared/services/general/api-base.service';
import { Mapper } from '../../shared/mapper/base-mapper.mapper';
import { ApiConstant } from '../../shared/config/api.constant';
import { filterNullEntity } from '../../shared/utils/filter-null-entity.util';
import { map, Observable, tap } from 'rxjs';
import { GroupList } from '../models/group.model';
import { ClassRoom } from '../../class-room/models/class-room.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private baseAPI: ApiBaseService,
    private mapper: Mapper
  ) { }

  getGroups(params:{}):Observable<GroupList> {
    return this.baseAPI.get(ApiConstant.GET_GROUPS ,{params}).pipe(
      map((res) => this.mapper.fromJson(GroupList, res.data))
    )
  }

  getClassesForGroup(groupId:string):Observable<ClassRoom[]> {
    return this.baseAPI.get(ApiConstant.GET_CLASSES_FOR_GROUP.replace('{id}',groupId)).pipe(
      map((res) => this.mapper.fromJson(ClassRoom, res.data.classes))
    )
  }
}
