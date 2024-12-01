import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '../base-component/base.component';
import { ParentService } from '../../../user/service/parent.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-reset-password-confirmation-dialog',
  templateUrl: './reset-password-confirmation-dialog.component.html',
  styleUrls: ['./reset-password-confirmation-dialog.component.scss']
})
export class ResetPasswordConfirmationDialogComponent extends BaseComponent  {
 constructor(
    public dialogRef: MatDialogRef<ResetPasswordConfirmationDialogComponent>,
    private parentService: ParentService,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {
    super()
  }

  onConfirm(): void {
    this.load(
      this.parentService.resetPassword({userId: this.data.user._id || ""})
    ).subscribe(res => {
      this.dialogRef.close(res);
    })
  }
}
