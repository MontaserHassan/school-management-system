import { Injectable } from '@angular/core';
import { ApiBaseService } from '../../shared/services/general/api-base.service';
import { Mapper } from '../../shared/mapper/base-mapper.mapper';
import { ISubjectPayload } from '../../subject/models/sybject-payload';
import { Student, StudentList } from '../models/student.model';
import { map, Observable } from 'rxjs';
import { ApiConstant } from '../../shared/config/api.constant';
import { IStudentPayload } from '../models/student-payload.model';
import { filterNullEntity } from '../../shared/utils/filter-null-entity.util';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(
    private baseAPI: ApiBaseService,
    private mapper: Mapper
  ) { }

  addStudent(body: IStudentPayload): Observable<Student> {
    return this.baseAPI.post(ApiConstant.ADD_STUDENT, filterNullEntity(body)).pipe(
      map((res) => this.mapper.fromJson(Student, res.data.student))
    )
  }

  getStudentById(id: string): Observable<Student> {
    return this.baseAPI.get(ApiConstant.GET_STUDENTS_BY_ID.replace('{id}', id)).pipe(
      map((res) => this.mapper.fromJson(Student, res.data.student))
    )
  }

  getStudents(): Observable<StudentList> {
    return this.baseAPI.get(ApiConstant.GET_STUDENTS).pipe(
      map((res) => this.mapper.fromJson(StudentList, res.data))
    )
  }

  addAttendance(body:{
    studentId: string,
    status: string,
    comment: string,
  }): Observable<Student> {
    return this.baseAPI.patch(ApiConstant.ADD_ATTENDANCE, filterNullEntity(body)).pipe(
      map((res) => this.mapper.fromJson(Student, res.data.student))
    )
  }

  addComment(body: {
    studentId: string,
    comment: string,
    media: string,
  }): Observable<Student> {
    return this.baseAPI.patch(ApiConstant.ADD_COMMENT, filterNullEntity(body)).pipe(
      map((res) => this.mapper.fromJson(Student, res.data.student))
    )
  }
}
