import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student, Domain } from '../../models/student.model';
import { MenuItem } from 'primeng/api';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { StudentService } from '../../services/student.service';
import { RolesConstants } from '../../../shared/config/roles-constants';
import { ProgressStatus } from '../../../shared/config/drop-down-value.constant';
import { DegreeLabel } from '../../enums/degree.enum';

@Component({
  selector: 'app-domain-action',
  templateUrl: './domain-action.component.html',
  styleUrls: ['./domain-action.component.scss']
})
export class DomainActionComponent extends BaseComponent implements OnInit {
  @Input() domain!: Domain
  @Input() studentId!: string
  @Output() updateStudentProfile = new EventEmitter<Student>()

  protected progressStatus = ProgressStatus

  protected RolesConstants = RolesConstants

  progressStatusOptions: MenuItem[] = this.progressStatus.map((status) => ({ label: this.translate("student.progressStatus."+ status.value), command: (data: any,) => this.updateProgressStatus(status._id) }));
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
      domainId: this.domain.domainId,
      status: event
    }
    this.load(this.studentService.updateStudentProgressStatus(payload), { isLoadingTransparent: true }).subscribe(res => {
      this.updateStudentProfile.emit(res);
    })
  }


  setDegreeColor(degree: string): "success" | "secondary" | "warning" | undefined {
      return DegreeLabel[degree as keyof typeof DegreeLabel] || undefined;
    }
}
