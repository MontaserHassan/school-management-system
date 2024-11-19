import { Injectable } from '@angular/core';
import { ApiBaseService } from '../../shared/services/general/api-base.service';
import { Mapper } from '../../shared/mapper/base-mapper.mapper';
import { IDomainPayload } from '../../domain/models/domain-payload';
import { Student, StudentList } from '../models/student.model';
import { map, Observable, tap } from 'rxjs';
import { ApiConstant } from '../../shared/config/api.constant';
import { IStudentPayload } from '../models/student-payload.model';
import { filterNullEntity } from '../../shared/utils/filter-null-entity.util';
import { downloadFile } from '../../shared/utils/download-file.utils';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(
    private baseAPI: ApiBaseService,
    private mapper: Mapper
  ) { }

  addStudent(body:{students:IStudentPayload[]}): Observable<Student[]> {
    return this.baseAPI.post(ApiConstant.ADD_STUDENT, filterNullEntity(body)).pipe(
      map((res) => this.mapper.fromJson(Student, res.data.students))
    )
  }

  getStudentById(id: string,params?:any): Observable<Student> {
    return this.baseAPI.get(ApiConstant.GET_STUDENTS_BY_ID.replace('{id}', id), {params}).pipe(
      tap((res) => {if(params?.['isExport']) downloadFile(res.data.base64String)}),
      map((res) => this.mapper.fromJson(Student, res.data.student))
    )
  }

  getStudents(params:any): Observable<StudentList> {
    return this.baseAPI.get(ApiConstant.GET_STUDENTS,{params}).pipe(
      tap((res) => {if(params?.isExport) downloadFile(res.data.base64String)}),
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

  updateStudentProgressStatus(
    body: {
      studentId: string,
      domainId: string,
      status: string
    }
  ): Observable<Student> {
    return this.baseAPI.patch(ApiConstant.UPDATE_STUDENT_PROGRESS_STATUS, filterNullEntity(body)).pipe(
      map((res) => this.mapper.fromJson(Student, res.data.student))
    )
  }

  updateStudentDegree(
    body: {
      studentId: string,
      skillId: string,
      degree: string
    }
  ): Observable<Student> {
    return this.baseAPI.patch(ApiConstant.UPDATE_STUDENT_DEGREE, filterNullEntity(body)).pipe(
      map((res) => this.mapper.fromJson(Student, res.data.student))
    )
  }

  editStudent(body:{studentName:string,studentId:string}): Observable<Student> {
    return this.baseAPI.patch(ApiConstant.UPDATE_STUDENT, filterNullEntity(body)).pipe(
      map((res) => this.mapper.fromJson(Student, res.data.student))
    )
  }
}
