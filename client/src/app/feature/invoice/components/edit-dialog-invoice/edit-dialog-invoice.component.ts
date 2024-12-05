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
    @Inject(MAT_DIALOG_DATA) public data: { invoice: Invoice, isStudent: boolean },
    private dialog: MatDialog,
    private invoiceService: InvoiceService
  ) {
    super();
    this.invoiceForm = this.fb.group({
      media: [data?.invoice.media || '', Validators.required],
    });

    if (data?.invoice.media) {
      this.previewImage = data.invoice.media;
      this.originalInvoice = data.invoice.media;
    }
  }

  onFileSelect(event: any) {
    const file = event.files[0];
    if (file) {
      const fileType = file.type;

      // Validate file type
      if (fileType.startsWith('image/')) {
        this.imageError = null; // Clear error if valid image

        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewImage = e.target.result; // Display image preview
          this.invoiceForm.patchValue({ media: this.previewImage }); // Update form with base64 image
        };
        reader.readAsDataURL(file); // Convert image to base64
      } else if (fileType === 'application/pdf' || fileType === 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        this.imageError = null; // Clear error for valid non-image file

        // Process PDF or Word files (if needed, e.g., upload to server or update form)
        this.convertFileToBase64(file)
          .then((base64: string) => {
            console.log('File in Base64:', base64); // Log the Base64 string
            this.invoiceForm.patchValue({ media: base64 }); // Update the form with the Base64 string
          })
          .catch((error) => {
            console.error('Error converting file to Base64:', error);
            this.imageError = this.translate('invoice.uploadError'); // Display error message
          });;
      } else {
        this.imageError = this.translate('invoice.uploadCheck'); // Set error message
        return;
      }
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
      const body = {
        invoiceId: this.data.invoice._id,
        media: this.invoiceForm.value.media
      }

      console.log(body);

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


  getApiCall(body: any): any {
    return this.data.isStudent ? this.invoiceService.editStudentInvoice(body) : this.invoiceService.editSchoolInvoice(body);
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file); // Convert file to Base64
    });
  }
}
