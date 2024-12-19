import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { Lookup } from '../../../shared/enums/lookup.enum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClassRoomService } from '../../services/class-room.service';

@Component({
  selector: 'app-add-activity-dialog',
  templateUrl: './add-activity-dialog.component.html',
  styleUrls: ['./add-activity-dialog.component.scss']
})
export class AddActivityDialogComponent extends BaseComponent implements OnInit {
  addActivityForm!: FormGroup;
  protected Lookup = Lookup;

  ngOnInit(): void {
    this.addActivityForm = this.fb.group({
      room: [this.data?.classRoomId ?  {label: this.data?.classRoomId } : '', Validators.required],
      skillId: ["", Validators.required],
      activityName: ['', Validators.required],
      materials: this.fb.array([this.createMaterialGroup()])
    });
  }

  constructor(
    public dialogRef: MatDialogRef<AddActivityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { classRoomId?: string ,addRoom?: boolean },
    private fb: FormBuilder,
    private classRoomService: ClassRoomService
  ) {
    super();
  }

  onSave(): void {
    if (this.addActivityForm.valid) {
      const skillId = this.addActivityForm.get('skillId')?.value.value;
      const room = this.addActivityForm.get('room')?.value.label;

      const payload ={
        ...this.addActivityForm.value,
        room,
        skillId,
        materials: this.addActivityForm.get('materials')?.value.map((material: any) => material.materialName)
      }
      this.load(this.classRoomService.addActivity(payload), {isLoadingTransparent: true}).subscribe(res => {
        this.dialogRef.close(res);
      })
    }
  }

  get materials(): FormArray {
    return this.addActivityForm.get('materials') as FormArray;
  }

  createMaterialGroup(): FormGroup {
    return this.fb.group({
      materialName: ['', Validators.required]
    });
  }

  addMaterial(): void {
    this.materials.push(this.createMaterialGroup());
  }

  removeMaterial(index: number): void {
    if (this.materials.length > 1) {
      this.materials.removeAt(index);
    }
  }
}
