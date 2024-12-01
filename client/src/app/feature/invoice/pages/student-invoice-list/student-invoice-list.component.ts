import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogInvoiceComponent } from '../../components/edit-dialog-invoice/edit-dialog-invoice.component';
import { MediaPreviewDialogComponent } from '../../../shared/component/media-preview-dialog/media-preview-dialog.component';
import { Invoice } from '../../models/invoice.model';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { InvoiceService } from '../../service/invoice.service';
import { AddInvoiceSchoolDialogComponent } from '../../components/add-invoice-school-dialog/add-invoice-school-dialog.component';
import { AddInvoiceStudentDialogComponent } from '../../components/add-invoice-student-dialog/add-invoice-student-dialog.component';
import { StudentInvoice } from '../../models/student-invoice.model';
import { RolesConstants } from '../../../shared/config/roles-constants';
import { ActivatedRoute } from '@angular/router';
import { PaymentResultDialogComponent } from '../../../shared/component/payment-result-dialog/payment-result-dialog.component';

@Component({
  selector: 'app-student-invoice-list',
  templateUrl: './student-invoice-list.component.html',
  styleUrls: ['./student-invoice-list.component.scss']
})
export class StudentInvoiceListComponent extends BaseComponent implements OnInit {
  invoices!: StudentInvoice[]
  protected RolesConstants = RolesConstants

  constructor(private dialog: MatDialog, private invoiceService: InvoiceService, private activeRoute: ActivatedRoute, private matDialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.getInvoicesList()

    this.activeRoute.queryParams.subscribe(params => {
      if (params?.['isSuccess']) {
        setTimeout(() => {
          const dialog = this.matDialog.open(PaymentResultDialogComponent,{
            data: {
              isSuccess: params?.['isSuccess'] === "true"
            }
          })
        }, 1000)
      }
    })
  }

  getInvoicesList(){
    const params = { page: this.offset, limit: this.pageSize};

    this.load(
      this.invoiceService.getStudentInvoices(params),{
        isLoadingTransparent: true,
      }
    ).subscribe((res) => {
      this.invoices = res.invoices;
      this.totalRowsCount = res.totalDocuments || 1;
      this.pageSize = res?.limit || 0
    })
  }

  paginate(event: any): void {
    this.offset =  event.first / event.rows + 1;
    this.pageSize = event.rows;
    this.getInvoicesList();
  }

  // Edit invoice
  editInvoice(invoice: any) {
    const dialogRef = this.dialog.open(EditDialogInvoiceComponent, {
      width: '500px',
      data: {invoice, isStudent: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getInvoicesList();
      }
    });
  }

    // Open the media dialog
  openMediaDialog(file: any) {
    this.dialog.open(MediaPreviewDialogComponent, {
      data: file,
      width: '80%'
    });
  }

  openInvoiceDialog() {
    const dialogRef = this.dialog.open(AddInvoiceStudentDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getInvoicesList();
      }
    });
  }

  createPayment(invoiceId: string) {
    this.load(
      this.invoiceService.createPayment({ invoiceId }),
      { isLoadingTransparent: true }
    ).subscribe((res) => {
      window.location.href = res.redirectURL
    });
  }
}
