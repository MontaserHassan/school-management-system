import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Lookup } from '../../../shared/enums/lookup.enum';
import { StudentService } from '../../services/student.service';
import { AttendStatus } from '../../../shared/config/drop-down-value.constant';

@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.scss']
})
export class AddAttendanceComponent extends BaseComponent implements OnInit {
  addAttendance!: FormGroup;

  protected Lookup = Lookup;
  protected attendStatus = AttendStatus

  constructor(
    public dialogRef: MatDialogRef<AddAttendanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      studentId:string,
      title: string,
      date: Date,
      extendedProps: {
        comment: string,
      }
    },
    private fb: FormBuilder,
    private studentService: StudentService
  ) {
    super();
  }


  ngOnInit() {
    const status = this.attendStatus.find((status) => status.label === this.data?.title);

    this.addAttendance = this.fb.group({
      status: [status , Validators.required],
      comment: [this.data?.extendedProps?.comment]
    });
  }

  onSave() {
    if (this.addAttendance.valid) {
      const payload = {
        status: this.addAttendance.value.status.value,
        comment: this.addAttendance.value.comment,
        studentId: this.data?.studentId
      }

      this.load(this.studentService.addAttendance(payload), {isLoadingTransparent: true}).subscribe(res => {
        this.dialogRef.close(res);
      })
    }
  }
}
