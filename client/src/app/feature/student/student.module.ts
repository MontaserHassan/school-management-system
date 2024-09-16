import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StudentRoutingModule } from './student.routes';
import { AddStudentComponent } from './pages/add-student/add-student.component';
import { StudentDetailsComponent } from './pages/student-details/student-details.component';
import { StudentListComponent } from './pages/student-list/student-list.component';

@NgModule({
  declarations: [
    AddStudentComponent,
    StudentDetailsComponent,
    StudentListComponent
  ],
  imports: [
    CommonModule, SharedModule, StudentRoutingModule,
  ],
})
export class StudentModule { }
