import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../shared/models/user.model';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { ParentService } from '../../service/parent.service';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.scss']
})
export class UpdateUserDialogComponent extends BaseComponent {
  userNameForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
    private parentService: ParentService,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {
    super();
    this.userNameForm = this.fb.group({
      userName: [data.user.userName || "", [Validators.required, Validators.minLength(3)]],
      email: [data.user.email || "", [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.userNameForm.valid) {
      const payload = {
        userName: this.userNameForm.value.userName,
        email: this.userNameForm.value.email,
        userId: this.data.user._id || ""
      };

      this.load(this.parentService.updateUser(payload)).subscribe(res => {
        this.dialogRef.close(res);
      });
    }
  }
}
