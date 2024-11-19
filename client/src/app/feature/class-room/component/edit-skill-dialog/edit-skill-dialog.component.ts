import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClassRoomService } from '../../services/class-room.service';
import { Skill } from '../../models/skill.model';

@Component({
  selector: 'app-edit-skill-dialog',
  templateUrl: './edit-skill-dialog.component.html',
  styleUrls: ['./edit-skill-dialog.component.scss']
})
export class EditSkillDialogComponent extends BaseComponent {
  skillForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditSkillDialogComponent>,
    private classRoomService: ClassRoomService,
    @Inject(MAT_DIALOG_DATA) public data: { skill:Skill }
  ) {
    super();
    this.skillForm = this.fb.group({
      skillName: [data.skill.skillName || "", [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit(): void {
    if (this.skillForm.valid) {
      const payload = {
        skillName: this.skillForm.value.skillName,
        skillId: this.data.skill._id || ""
      }
      this.load(this.classRoomService.editSkill(payload)).subscribe(res => {
        this.dialogRef.close(res);
      })
    }
  }
}
