import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { Lookup } from '../../../shared/enums/lookup.enum';
import { MediaPreviewDialogComponent } from '../../../shared/component/media-preview-dialog/media-preview-dialog.component';
import { InvoiceService } from '../../service/invoice.service';

@Component({
  selector: 'app-add-invoice-school-dialog',
  templateUrl: './add-invoice-school-dialog.component.html',
  styleUrls: ['./add-invoice-school-dialog.component.scss']
})
export class AddInvoiceSchoolDialogComponent extends BaseComponent{
  invoiceForm: FormGroup;
  uploadedFiles: any[] = [];
  imageError: string | null = null;

  protected Lookup = Lookup

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddInvoiceSchoolDialogComponent>,
    private dialog: MatDialog,
    private invoiceService: InvoiceService
  ) {
    super();
    // Initialize the form
    this.invoiceForm = this.fb.group({
      schoolId: ['', Validators.required],
      amount: ['', Validators.required],
      media: ['']
    });
  }

  // Method for PrimeNG file uploader
  onSelect(event: any) {
    const file = event.files[0];
    if (file) {
      const fileType = file.type;

      // Validate file type
      if (fileType.startsWith('image/')) {
        this.imageError = null; // Clear error if valid image

        const reader = new FileReader();
        reader.onload = (e: any) => {
          const previewImage = e.target.result; // Display image preview
          this.invoiceForm.patchValue({ media: previewImage }); // Update form with base64 image
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

  openMediaDialog(file: any) {
    this.dialog.open(MediaPreviewDialogComponent, {
      data: file,
      width: '80%'
    });
  }

  addInvoice() {
    if (this.invoiceForm.valid) {
      const body ={
        schoolId: this.invoiceForm.get('schoolId')?.value.value,
        media: this.invoiceForm.get('media')?.value,
        amount: this.invoiceForm.get('amount')?.value
      }
      this.load(
        this.invoiceService.addSchoolInvoice(body), {
          isLoadingTransparent: true
        }
      ).subscribe((response) => {
        this.dialogRef.close(true);
      }
      )
    }
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
