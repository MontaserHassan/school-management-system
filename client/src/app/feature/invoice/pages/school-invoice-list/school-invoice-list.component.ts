import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogInvoiceComponent } from '../../components/edit-dialog-invoice/edit-dialog-invoice.component';
import { MediaPreviewDialogComponent } from '../../components/media-preview-dialog/media-preview-dialog.component';
import { Invoice } from '../../models/invoice.model';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { InvoiceService } from '../../service/invoice.service';
import { AddInvoiceSchoolDialogComponent } from '../../components/add-invoice-school-dialog/add-invoice-school-dialog.component';
import { RolesConstants } from '../../../shared/config/roles-constants';

@Component({
  selector: 'app-school-invoice-list',
  templateUrl: './school-invoice-list.component.html',
  styleUrls: ['./school-invoice-list.component.scss']
})
export class SchoolInvoiceListComponent extends BaseComponent implements OnInit {
  invoices!: Invoice[]

  protected RolesConstants = RolesConstants;

  constructor(private dialog: MatDialog, private invoiceService: InvoiceService) {
    super();
   }

  ngOnInit(): void {
    this.getInvoicesList();
  }

  getInvoicesList(){
    const params = { page: this.offset, limit: this.pageSize};

    this.load(
      this.invoiceService.getSchoolInvoices(params),{
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
      data: {invoice}
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
    const dialogRef = this.dialog.open(AddInvoiceSchoolDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getInvoicesList();
      }
    });
  }
}
