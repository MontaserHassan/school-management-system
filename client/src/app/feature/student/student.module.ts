import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StudentRoutingModule } from './student.routes';
import { AddStudentComponent } from './pages/add-student/add-student.component';
import { StudentDetailsComponent } from './pages/student-details/student-details.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { AttendanceCalenderComponent } from './component/attendance-calender/attendance-calender.component';
import { AddAttendanceComponent } from './component/add-attendance/add-attendance.component';
import { AddCommentDialogComponent } from './component/add-comment-dialog/add-comment-dialog.component';

@NgModule({
  declarations: [
    AddStudentComponent,
    StudentDetailsComponent,
    StudentListComponent,
    AttendanceCalenderComponent,
    AddAttendanceComponent,
    AddCommentDialogComponent
  ],
  imports: [
    CommonModule, SharedModule, StudentRoutingModule,
  ],
})
export class StudentModule { }
