import { Injectable } from '@angular/core';
import { ApiBaseService } from '../../shared/services/general/api-base.service';
import { Mapper } from '../../shared/mapper/base-mapper.mapper';
import { IClassDetailsPayload } from '../models/class-room-payload.model';
import { ApiConstant } from '../../shared/config/api.constant';
import { map, Observable } from 'rxjs';
import { filterNullEntity } from '../../shared/utils/filter-null-entity.util';
import { ClassRoom, ClassRoomResponse } from '../models/class-room.model';
import { Topic, TopicList } from '../models/topic.model';
import { Student } from '../../student/models/student.model';

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

  getClassRoomById(id:string):Observable<ClassRoom> {
    return this.baseAPI.get(ApiConstant.GET_CLASS_ROOM_BY_ID.replace('{id}',id)).pipe(
      map((res) => this.mapper.fromJson(ClassRoom, res.data.classRoom))
    )
  }

  getClassRoomList():Observable<ClassRoomResponse> {
    return this.baseAPI.get(ApiConstant.GET_CLASS_ROOMS).pipe(
      map((res) => this.mapper.fromJson(ClassRoomResponse, res.data))
    )
  }

  addTopic(body: {classRoomId:string,topicName:string , subjectId:string}):Observable<Topic> {
    return this.baseAPI.post(ApiConstant.ADD_TOPIC, body).pipe(
      map((res) => this.mapper.fromJson(Topic, res.data.topic))
    )
  }

  getTopics():Observable<TopicList> {
    return this.baseAPI.get(ApiConstant.GET_TOPICS).pipe(
      map((res) => this.mapper.fromJson(TopicList, res.data))
    )
  }

  addStudentToClassRoom(body: {students:string[],classRoom:string}):Observable<Student> {
    return this.baseAPI.post(ApiConstant.ADD_STUDENT_TO_CLASS, body).pipe(
      map((res) => this.mapper.fromJson(Student, res.data.students))
    )
  }
}
