import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { Router } from '@angular/router';
import { RoutesUtil } from '../../../shared/utils/routes.util';
import { MenuItem } from 'primeng/api';
import { EditStudentDialogComponent } from '../../component/edit-student-dialog/edit-student-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserRoleService } from '../../../shared/services/auth/user-role.service';
import { RolesConstants } from '../../../shared/config/roles-constants';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent extends BaseComponent implements OnInit {
  students!: Student[]
  studentAction!:MenuItem[]
  constructor(private studentService: StudentService, private router: Router, private dialog: MatDialog, private userRoleService:UserRoleService) {
    super();
  }

  ngOnInit() {
    this.studentAction = [
      {
        label: 'Actions',
        items: [
          {
            label: 'view Student',
            icon: 'pi pi-eye',
          },
          {
            label: 'edit',
            icon: 'pi pi-pencil',
            visible: this.userRoleService.isUserHasRoles(RolesConstants.EDIT_STUDENT),
          },
        ]
      }
    ];
  }

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

  handleClick(label: string, student:Student): void {
    if (!this.studentAction.length) {
      return
    }
    if (label === this.studentAction?.[0]?.items?.[0]?.label) {
      this.gotoStudentDetails(student._id || "")
    }
    else if (label === this.studentAction?.[0]?.items?.[1]?.label) {
      const dialog = this.dialog.open(EditStudentDialogComponent, {
        data: { student }
      })

      dialog.afterClosed().subscribe(res => {
        if (res) {
          this.getStudentsList()
        }
      })
    }
  }
}
