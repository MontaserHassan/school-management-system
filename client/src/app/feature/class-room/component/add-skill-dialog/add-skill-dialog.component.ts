import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { ClassRoomService } from '../../services/class-room.service';
import { Lookup } from '../../../shared/enums/lookup.enum';

@Component({
  selector: 'app-add-skill-dialog',
  templateUrl: './add-skill-dialog.component.html',
  styleUrls: ['./add-skill-dialog.component.scss']
})
export class AddSkillDialogComponent  extends BaseComponent implements OnInit {
  addSkillForm!: FormGroup;
  protected Lookup = Lookup;

  ngOnInit(): void {
    this.addSkillForm = this.fb.group({
      room: [this.data?.classRoomId ?  {label: this.data?.classRoomId } : '', Validators.required],
      domainId: ["", Validators.required],
      skillName: ['', Validators.required]
    });
  }

  constructor(
    public dialogRef: MatDialogRef<AddSkillDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { classRoomId?: string ,addRoom?: boolean },
    private fb: FormBuilder,
    private classRoomService: ClassRoomService
  ) {
    super();
  }

  onSave(): void {
    if (this.addSkillForm.valid) {
      const domainId = this.addSkillForm.get('domainId')?.value.value;
      const room = this.addSkillForm.get('room')?.value.label;
      const payload ={
        ...this.addSkillForm.value,
        room,
        domainId: domainId,
      }
      this.load(this.classRoomService.addSkill(payload), {isLoadingTransparent: true}).subscribe(res => {
        this.dialogRef.close(res);
      })
    }
  }
}
