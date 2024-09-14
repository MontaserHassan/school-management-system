import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SubjectRoutingModule } from './subject.routes';
import { SharedModule } from '../shared/shared.module';
import { SubjectListComponent } from './pages/subject-list/subject-list.component';
import { AddSubjectComponent } from './pages/add-subject/add-subject.component';
import { SubjectViewComponent } from './pages/subject-view/subject-view.component';

@NgModule({
  declarations: [
    SubjectListComponent,
    AddSubjectComponent,
    SubjectViewComponent
  ],
  imports: [
    CommonModule, SharedModule, SubjectRoutingModule,
  ],
})
export class SubjectModule { }
