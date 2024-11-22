import { Injectable } from '@angular/core';
import { Mapper } from '../../shared/mapper/base-mapper.mapper';
import { ApiBaseService } from '../../shared/services/general/api-base.service';
import { map, Observable } from 'rxjs';
import { ParentResponse } from '../models/parent.model';
import { ApiConstant } from '../../shared/config/api.constant';
import { Student } from '../../student/models/student.model';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor(
    private baseAPI: ApiBaseService,
    private mapper: Mapper
  ) { }


  addParent(
    body: {
      userName: string,
      email: string,
      students: {
        studentName: string,
        media: string
      }[]
      termsAndCondition: boolean
    }
  ): Observable<ParentResponse> {
    return this.baseAPI.post(ApiConstant.ADD_PARENT, body).pipe(
      map((res) => this.mapper.fromJson(ParentResponse, res.data))
    )
  }

  getStudentByParentId(id: string): Observable<Student[]> {
    return this.baseAPI.get(ApiConstant.GET_STUDENT_BY_PARENT_ID.replace('{id}', id)).pipe(
      map((res) => this.mapper.fromJson(Student, res.data.students))
    )
  }

  updateUser(body: { userName: string , userId:string , termsAndCondition:boolean  }): Observable<User> {
    return this.baseAPI.patch(ApiConstant.UPDATE_USER, body).pipe(
      map((res) => this.mapper.fromJson(User, res.data))
    )
  }

  resetPassword(body: { userId: string }): Observable<User> {
    return this.baseAPI.patch(ApiConstant.RESET_PASSWORD , body).pipe(
      map((res) => this.mapper.fromJson(User, res.data))
    )
  }
}
