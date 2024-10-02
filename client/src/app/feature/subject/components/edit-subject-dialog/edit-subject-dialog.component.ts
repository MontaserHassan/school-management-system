import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from '../../models/subject.model';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-edit-subject-dialog',
  templateUrl: './edit-subject-dialog.component.html',
  styleUrls: ['./edit-subject-dialog.component.scss']
})
export class EditSubjectDialogComponent extends BaseComponent {
 editSubjectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditSubjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { subject:Subject},
    private subjectService: SubjectService
  ) {
    super();
    this.editSubjectForm = this.fb.group({
      subjectName: [data.subject.subjectName || "", [Validators.required]],
      courseTime: [data.subject.courseTime || "", [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.editSubjectForm.valid) {
      this.load(
        this.subjectService.editSubject({
          subjectName: this.editSubjectForm.value.subjectName,
          courseTime: this.editSubjectForm.value.courseTime,
          subjectId: this.data.subject._id || ""
        })
      ).subscribe(res => {
        this.dialogRef.close(res);
      })
    }
  }

}
