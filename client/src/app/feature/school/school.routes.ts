import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesUtil } from '../shared/utils/routes.util';
import { AddSchoolComponent } from './pages/add-school/add-school.component';
import { ViewSchoolComponent } from './pages/view-school/view-school.component';
import { SchoolsListComponent } from './pages/schools-list/schools-list.component';

const routes: Routes = [
  {
    path: RoutesUtil.AddSchool.path,
    component: AddSchoolComponent
  },
  {
    path: RoutesUtil.SchoolView.path,
    component: ViewSchoolComponent
  },
  {
    path: RoutesUtil.SchoolList.path,
    component:SchoolsListComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class schoolRoutingModule { }
