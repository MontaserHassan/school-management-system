import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-edit-student-dialog',
  templateUrl: './edit-student-dialog.component.html',
  styleUrls: ['./edit-student-dialog.component.scss']
})
export class EditStudentDialogComponent extends BaseComponent {
 editStudentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditStudentDialogComponent>,
    private studentService: StudentService,
    @Inject(MAT_DIALOG_DATA) public data: { student: Student }
  ) {
    super();
    this.editStudentForm = this.fb.group({
      studentName: [data.student.studentName || "", [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.editStudentForm.valid) {
      this.load(
        this.studentService.editStudent({
          studentName: this.editStudentForm.value.studentName,
          studentId: this.data.student._id || ""
        })
      ).subscribe(res => {
        this.dialogRef.close(res);
      })
    }
  }

}
