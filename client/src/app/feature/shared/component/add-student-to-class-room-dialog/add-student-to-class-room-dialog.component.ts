import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lookup } from '../../enums/lookup.enum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClassRoomService } from '../../../class-room/services/class-room.service';
import { BaseComponent } from '../base-component/base.component';

@Component({
  selector: 'app-add-student-to-class-room-dialog',
  templateUrl: './add-student-to-class-room-dialog.component.html',
  styleUrls: ['./add-student-to-class-room-dialog.component.scss']
})
export class AddStudentToClassRoomDialogComponent extends BaseComponent implements OnInit {
  addStudentForm!: FormGroup;
  protected Lookup = Lookup;

  ngOnInit(): void {
    this.addStudentForm = this.fb.group({
      classRoom: [this.data?.classRoomId ? { label: this.data?.classRoomId } : '', Validators.required],
      student: [this.data?.studentId ? [{ value: this.data.studentId }] : '', Validators.required],
    });
  }

  constructor(
    public dialogRef: MatDialogRef<AddStudentToClassRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { classRoomId?: string, studentId?: string },
    private fb: FormBuilder,
    private classRoomService: ClassRoomService
  ) {
    super();
  }

  onSave(): void {
    if (this.addStudentForm.valid) {
      const students = this.addStudentForm.get('student')?.value.map((student: any) => ({studentId:student.value}));
      const classRoom = this.addStudentForm.get('classRoom')?.value.label;
      const payload = {
        students,
        classRoom,
      }
      this.load(this.classRoomService.addStudentToClassRoom(payload), { isLoadingTransparent: true }).subscribe(res => {
        this.dialogRef.close(res[0]);
      })
    }
  }
}
