import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesUtil } from '../shared/utils/routes.util';
import { SubjectListComponent } from './pages/subject-list/subject-list.component';
import { AddSubjectComponent } from './pages/add-subject/add-subject.component';
import { SubjectViewComponent } from './pages/subject-view/subject-view.component';

const routes: Routes = [
  {
    path: RoutesUtil.SubjectList.path,
    component: SubjectListComponent,
  },
  {
    path:RoutesUtil.AddSubject.path,
    component: AddSubjectComponent,
  },
  {
    path: RoutesUtil.SubjectView.path,
    component: SubjectViewComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
