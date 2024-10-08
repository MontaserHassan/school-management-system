import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InvoiceRoutingModule } from './invoice.routes';
import { SharedModule } from '../shared/shared.module';
import { SchoolInvoiceListComponent } from './pages/school-invoice-list/school-invoice-list.component';
import { EditDialogInvoiceComponent } from './components/edit-dialog-invoice/edit-dialog-invoice.component';
import { MediaPreviewDialogComponent } from './components/media-preview-dialog/media-preview-dialog.component';
import { AddInvoiceSchoolDialogComponent } from './components/add-invoice-school-dialog/add-invoice-school-dialog.component';
import { StudentInvoiceListComponent } from './pages/student-invoice-list/student-invoice-list.component';
import { AddInvoiceStudentDialogComponent } from './components/add-invoice-student-dialog/add-invoice-student-dialog.component';

@NgModule({
  declarations: [
    SchoolInvoiceListComponent,
    EditDialogInvoiceComponent,
    MediaPreviewDialogComponent,
    AddInvoiceSchoolDialogComponent,
    StudentInvoiceListComponent,
    AddInvoiceStudentDialogComponent
  ],
  imports: [
    CommonModule, SharedModule, InvoiceRoutingModule,
  ],
})
export class InvoiceModule { }
