import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesUtil } from '../shared/utils/routes.util';
import { SchoolInvoiceListComponent } from './pages/school-invoice-list/school-invoice-list.component';
import { StudentInvoiceListComponent } from './pages/student-invoice-list/student-invoice-list.component';

const routes: Routes = [
  {
    path: RoutesUtil.SchoolInvoiceList.path,
    component: SchoolInvoiceListComponent
  },
  {
    path: RoutesUtil.StudentInvoiceList.path,
    component: StudentInvoiceListComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
