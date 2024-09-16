import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesUtil } from '../shared/utils/routes.util';
import { AddStudentComponent } from './pages/add-student/add-student.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentDetailsComponent } from './pages/student-details/student-details.component';

const routes: Routes = [
  {
    path: RoutesUtil.AddStudent.path,
    component: AddStudentComponent,
  },
  {
    path: RoutesUtil.StudentList.path,
    component: StudentListComponent,
  },
  {
    path: RoutesUtil.StudentView.path,
    component: StudentDetailsComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
