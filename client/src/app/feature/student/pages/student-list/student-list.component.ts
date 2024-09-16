import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { Router } from '@angular/router';
import { RoutesUtil } from '../../../shared/utils/routes.util';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent extends BaseComponent implements OnInit {
  students!: Student[]
  constructor(private studentService: StudentService,private router: Router) {
    super();
  }

  ngOnInit() {
    this.getStudentsList()
  }

  getStudentsList() {
    this.load(this.studentService.getStudents(), { isLoadingTransparent: true }).subscribe(res => {
      this.students = res.students || [];
    })
  }

  gotoStudentDetails(studentId: string) {
    this.router.navigate([RoutesUtil.StudentView.url({params:{id:studentId}}) ])
  }
}
