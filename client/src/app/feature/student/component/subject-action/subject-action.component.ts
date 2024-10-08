import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student, Subject } from '../../models/student.model';
import { MenuItem } from 'primeng/api';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { StudentService } from '../../services/student.service';
import { RolesConstants } from '../../../shared/config/roles-constants';

@Component({
  selector: 'app-subject-action',
  templateUrl: './subject-action.component.html',
  styleUrls: ['./subject-action.component.scss']
})
export class SubjectActionComponent extends BaseComponent implements OnInit {
  @Input() subject!: Subject
  @Input() studentId!: string
  @Output() updateStudentProfile = new EventEmitter<Student>()

  progressStatus = [
    {
      "_id": "SchoolSystem-3-1",
      "value": "In Progress"
    },
    {
      "_id": "SchoolSystem-3-2",
      "value": "Almost Done"
    },
    {
      "_id": "SchoolSystem-3-3",
      "value": "Completed"
    }
  ]

  protected RolesConstants = RolesConstants

  progressStatusOptions: MenuItem[] = this.progressStatus.map((status) => ({ label: status.value, command: (data: any,) => this.updateProgressStatus(status._id) }));
  constructor(
    private studentService: StudentService
  ) {
    super()
  }

  ngOnInit() {
  }

  updateProgressStatus(event: any) {
    const payload = {
      studentId: this.studentId,
      subjectId: this.subject.subjectId,
      status: event
    }
    this.load(this.studentService.updateStudentProgressStatus(payload), { isLoadingTransparent: true }).subscribe(res => {
      this.updateStudentProfile.emit(res);
    })
  }

}
