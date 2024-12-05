import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CycleListComponent } from './pages/cycle-list/cycle-list.component';
import { CycleRoutingModule } from './cycle.routes';
import { SharedModule } from '../shared/shared.module';
import { NationalEducationsListComponent } from './component/national-educations-list/national-educations-list.component';
import { AddEditEducationsDomainsDialogComponent } from './component/add-edit-educations-domains-dialog/add-edit-educations-domains-dialog.component';




@NgModule({
  declarations: [
    CycleListComponent,
    NationalEducationsListComponent,
    AddEditEducationsDomainsDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CycleRoutingModule,
  ]
})
export class CycleModule { }
