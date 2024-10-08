import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { Lookup } from '../../../shared/enums/lookup.enum';
import { MediaPreviewDialogComponent } from '../media-preview-dialog/media-preview-dialog.component';
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
      media: ['', Validators.required]
    });
  }

  // Method for PrimeNG file uploader
  onSelect(event: any) {
    const file = event.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        this.imageError = 'Please upload a valid image file.';
        return;
      }
      this.imageError = null;  // Clear error if valid image

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const previewImage = e.target.result;  // Display image preview
        this.invoiceForm.patchValue({ media: previewImage });  // Update form with base64 image
      };
      reader.readAsDataURL(file);  // Convert image to base64
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
        media: this.invoiceForm.get('media')?.value
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
}
