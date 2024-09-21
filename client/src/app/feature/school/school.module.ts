import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { schoolRoutingModule } from './school.routes';
import { SchoolsListComponent } from './pages/schools-list/schools-list.component';
import { ViewSchoolComponent } from './pages/view-school/view-school.component';
import { AddSchoolComponent } from './pages/add-school/add-school.component';


@NgModule({
  declarations: [
    AddSchoolComponent, ViewSchoolComponent, SchoolsListComponent
  ],
  imports: [
    CommonModule, SharedModule, schoolRoutingModule,
  ],
})
export class SchoolModule { }