import { Injectable } from '@angular/core';
import { ApiBaseService } from '../../shared/services/general/api-base.service';
import { Mapper } from '../../shared/mapper/base-mapper.mapper';
import { IClassDetailsPayload } from '../models/class-room-payload.model';
import { ApiConstant } from '../../shared/config/api.constant';
import { map, Observable, tap } from 'rxjs';
import { filterNullEntity } from '../../shared/utils/filter-null-entity.util';
import { ClassRoom, ClassRoomResponse } from '../models/class-room.model';
import { Skill, SkillList } from '../models/skill.model';
import { Student } from '../../student/models/student.model';
import { downloadFile } from '../../shared/utils/download-file.utils';
import { Activity, ActivityList } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ClassRoomService {
constructor(
    private baseAPI: ApiBaseService,
    private mapper: Mapper
  ) { }

  addClassRoom(body:IClassDetailsPayload):Observable<ClassRoom> {
    return this.baseAPI.post(ApiConstant.ADD_CLASS_ROOM, filterNullEntity(body)).pipe(
      map((res) => this.mapper.fromJson(ClassRoom, res.data.classRoom))
    )
  }

  editClassRoom(body:IClassDetailsPayload):Observable<ClassRoom> {
    return this.baseAPI.patch(ApiConstant.EDIT_CLASS_ROOM, filterNullEntity(body)).pipe(
      map((res) => this.mapper.fromJson(ClassRoom, res.data.classRoom))
    )
  }

  getClassRoomById(id:string,params?:any):Observable<ClassRoom> {
    return this.baseAPI.get(ApiConstant.GET_CLASS_ROOM_BY_ID.replace('{id}',id),{params}).pipe(
      tap((res) => {if(params?.['isExport']) downloadFile(res.data.base64String)}),
      map((res) => this.mapper.fromJson(ClassRoom, res.data.classRoom))
    )
  }

  getClassRoomList(params:any):Observable<ClassRoomResponse> {
    return this.baseAPI.get(ApiConstant.GET_CLASS_ROOMS,{params}).pipe(
      tap((res) => {if(params?.['isExport']) downloadFile(res.data.base64String)}),
      map((res) => this.mapper.fromJson(ClassRoomResponse, res.data))
    )
  }

  addSkill(body: {classRoomId:string,skillName:string , domainId:string}):Observable<Skill> {
    return this.baseAPI.post(ApiConstant.ADD_SKILL, body).pipe(
      map((res) => this.mapper.fromJson(Skill, res.data.skill))
    )
  }

  getSkills(params:{}):Observable<SkillList> {
    return this.baseAPI.get(ApiConstant.GET_SKILLS,{params}).pipe(
      map((res) => this.mapper.fromJson(SkillList, res.data))
    )
  }

  editSkill(body: {skillName:string,skillId:string}):Observable<Skill> {
    return this.baseAPI.patch(ApiConstant.EDIT_SKILL, body).pipe(
      map((res) => this.mapper.fromJson(Skill, res.data.skill))
    )
  }


  addStudentToClassRoom(body: {students:string[],classRoom:string}):Observable<Student[]> {
    return this.baseAPI.post(ApiConstant.ADD_STUDENT_TO_CLASS, body).pipe(
      map((res) => this.mapper.fromJson(Student, res.data.students))
    )
  }

  deleteStudentFromClassRoom(body: {studentId:string,roomId:string}):Observable<Student> {
    return this.baseAPI.patch(ApiConstant.DELETE_STUDENT_FROM_CLASS, body).pipe(
      map((res) => this.mapper.fromJson(Student, res.data.students))
    )
  }

  removeClassRoom(id:string):Observable<any> {
    return this.baseAPI.delete(ApiConstant.DELETE_CLASS_ROOM_BY_ID.replace('{id}',id)).pipe(
      map((res) => res.data)
    )
  }

  addActivity(body: {classRoomId:string,skillId:string ,materialName:string ,activityName:string}):Observable<Activity> {
    return this.baseAPI.post(ApiConstant.ADD_ACTIVITY, body).pipe(
      map((res) => this.mapper.fromJson(Activity, res.data.activity))
    )
  }

  getActivities(params:{}):Observable<ActivityList> {
    return this.baseAPI.get(ApiConstant.GET_ACTIVITIES,{params}).pipe(
      map((res) => this.mapper.fromJson(ActivityList, res.data))
    )
  }

  editActivity(body: {classRoomId:string,skillId:string ,materialName:string ,activityName:string, activityId:string}):Observable<Activity> {
    return this.baseAPI.patch(ApiConstant.EDIT_ACTIVITY, body).pipe(
      map((res) => this.mapper.fromJson(Activity, res.data.activity))
    )
  }
}
