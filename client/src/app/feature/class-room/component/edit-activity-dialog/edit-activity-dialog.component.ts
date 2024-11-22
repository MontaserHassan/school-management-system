import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClassRoomService } from '../../services/class-room.service';
import { Activity } from '../../models/activity.model';

@Component({
  selector: 'app-edit-activity-dialog',
  templateUrl: './edit-activity-dialog.component.html',
  styleUrls: ['./edit-activity-dialog.component.scss']
})
export class EditActivityDialogComponent extends BaseComponent {
  activityForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditActivityDialogComponent>,
    private classRoomService: ClassRoomService,
    @Inject(MAT_DIALOG_DATA) public data: { activity:Activity }
  ) {
    super();
    this.activityForm = this.fb.group({
      activityName: [data.activity.activityName || "", [Validators.required, Validators.minLength(3)]],
      materialName: [data.activity.materialName || "", [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit(): void {
    if (this.activityForm.valid) {
      const payload = {
        ...this.activityForm.value,
        activityId: this.data.activity._id || "",
      }
      this.load(this.classRoomService.editActivity(payload)).subscribe(res => {
        this.dialogRef.close(res);
      })
    }
  }
}
