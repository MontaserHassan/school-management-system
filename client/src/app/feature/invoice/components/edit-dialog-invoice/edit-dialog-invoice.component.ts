import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FileUpload } from 'primeng/fileupload';
import { MediaPreviewDialogComponent } from '../../../shared/component/media-preview-dialog/media-preview-dialog.component';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { InvoiceService } from '../../service/invoice.service';
import { Invoice } from '../../models/invoice.model';

@Component({
  selector: 'app-edit-dialog-invoice',
  templateUrl: './edit-dialog-invoice.component.html'
})
export class EditDialogInvoiceComponent extends BaseComponent {
  @ViewChild('fileUpload') fileUpload!: FileUpload;

  invoiceForm: FormGroup;
  originalInvoice: string | ArrayBuffer | null = null;
  previewImage: string | ArrayBuffer | null = null;  // To store base64 image for preview
  imageError: string | null = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditDialogInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {invoice:Invoice ,isStudent:boolean},
    private dialog: MatDialog,
    private invoiceService: InvoiceService
  ) {
    super();
    this.invoiceForm = this.fb.group({
      media: [data?.invoice.media || '',Validators.required],
    });

    if (data?.invoice.media) {
      this.previewImage = data.invoice.media;
      this.originalInvoice = data.invoice.media;
    }
  }

  onFileSelect(event: any) {
    const file = event.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        this.imageError =  this.translate('invoice.uploadCheck');
        return;
      }
      this.imageError = null;  // Clear error if valid image

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;  // Display image preview
        this.invoiceForm.patchValue({ media: this.previewImage });  // Update form with base64 image
      };
      reader.readAsDataURL(file);  // Convert image to base64
    }
  }

  clearFile() {
    this.fileUpload?.clear();  // Clear the file input
    this.previewImage = this.originalInvoice;
    this.invoiceForm.patchValue({ media: this.originalInvoice });  // Clear media from form
  }

  openMediaDialog(file: any) {
    this.dialog.open(MediaPreviewDialogComponent, {
      data: file,
      width: '80%'
    });
  }

  onSubmit() {
    if (this.invoiceForm.valid) {
      const body ={
        invoiceId: this.data.invoice._id,
        media: this.invoiceForm.value.media
      }
      this.load(
        this.getApiCall(body)
        , {
          isLoadingTransparent: true,
        }
      ).subscribe((res) => {
        this.dialogRef.close(res);
      }
      )
    }
  }


  getApiCall(body:any):any{
    return this.data.isStudent ? this.invoiceService.editStudentInvoice(body) : this.invoiceService.editSchoolInvoice(body);
  }
}
