import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-media-preview-dialog',
  templateUrl: './media-preview-dialog.component.html',
  styleUrls: ['./media-preview-dialog.component.scss']
})
export class MediaPreviewDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<MediaPreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}


  downloadFile() {
    const link = document.createElement('a');
    link.href = this.data;
    link.download = "invoice";
    link.click();
  }
}
