import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DomainRoutingModule } from './domain.routes';
import { SharedModule } from '../shared/shared.module';
import { DomainListComponent } from './pages/domain-list/domain-list.component';
import { AddDomainComponent } from './pages/add-domain/add-domain.component';
import { DomainViewComponent } from './pages/domain-view/domain-view.component';
import { EditDomainDialogComponent } from './components/edit-domain-dialog/edit-domain-dialog.component';
import { EditStudentDialogComponent } from '../student/component/edit-student-dialog/edit-student-dialog.component';

@NgModule({
  declarations: [
    DomainListComponent,
    AddDomainComponent,
    DomainViewComponent,
    EditDomainDialogComponent,
    EditStudentDialogComponent
  ],
  imports: [
    CommonModule, SharedModule, DomainRoutingModule,
  ],
})
export class DomainModule { }
