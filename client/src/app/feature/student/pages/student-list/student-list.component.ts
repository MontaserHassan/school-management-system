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
  constructor(private studentService: StudentService, private router: Router) {
    super();
  }

  ngOnInit() { }

  getStudentsList() {
    const params = { page: this.offset, limit: this.pageSize };

    this.load(this.studentService.getStudents(params), { isLoadingTransparent: true }).subscribe(res => {
      this.students = res.students || [];
      this.totalRowsCount = res.totalDocuments || 1;
      this.pageSize = res?.limit || 0

    })
  }

  gotoStudentDetails(studentId: string) {
    this.router.navigate([RoutesUtil.StudentView.url({ params: { id: studentId } })])
  }

  paginate(event: any): void {
    this.offset = event.first / event.rows + 1;
    this.pageSize = event.rows;
    this.getStudentsList();
  }
}
