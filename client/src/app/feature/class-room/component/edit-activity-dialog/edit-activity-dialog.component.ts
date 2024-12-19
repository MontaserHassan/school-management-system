import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      materials: this.fb.array(this.initMaterials(data.activity.materials || []))
    });
  }

  get materials(): FormArray {
    return this.activityForm.get('materials') as FormArray;
  }

  initMaterials(materials: string[]): FormGroup[] {
    return materials.map(material =>
      this.fb.group({
        materialName: [material, [Validators.required, Validators.minLength(2)]]
      })
    );
  }

  addMaterial(): void {
    this.materials.push(
      this.fb.group({
        materialName: ['', [Validators.required, Validators.minLength(2)]]
      })
    );
  }

  removeMaterial(index: number): void {
    if (this.materials.length > 1) {
      this.materials.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.activityForm.valid) {
      const payload = {
        ...this.activityForm.value,
        activityId: this.data.activity._id || "",
        materials: this.activityForm.get('materials')?.value.map((material: any) => material.materialName)
      }
      this.load(this.classRoomService.editActivity(payload)).subscribe(res => {
        this.dialogRef.close(res);
      })
    }
  }
}
