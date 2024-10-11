import { Component, OnInit } from '@angular/core';
import { Subject } from '../../models/subject.model';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { SubjectService } from '../../services/subject.service';
import { Router } from '@angular/router';
import { RoutesUtil } from '../../../shared/utils/routes.util';
import { MenuItem } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { EditSubjectDialogComponent } from '../../components/edit-subject-dialog/edit-subject-dialog.component';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent extends BaseComponent implements OnInit {
  subjects!: Subject[]
  subjectAction!:MenuItem[]

  constructor(private subjectService: SubjectService, private router: Router ,private dialog: MatDialog) {
    super()
  }

  ngOnInit() {
    this.subjectAction = [
      {
        label: 'Actions',
        items: [
          {
            label: 'view Subject',
            icon: 'pi pi-book',
          },
          {
            label: 'edit',
            icon: 'pi pi-pencil'
          },
        ]
      }
    ];
    this.getSubjects()
  }

  getSubjects() {
    const params = { page: this.offset, limit: this.pageSize};
    this.load(this.subjectService.getSubjects(params), { isLoadingTransparent: true }).subscribe(subjects => {
      this.subjects = subjects.subject || [];
      this.totalRowsCount = subjects.totalDocuments || 1;
      this.pageSize = subjects?.limit || 0

    })
  }

  viewSubject(id: string): void {
    this.router.navigate([RoutesUtil.SubjectView.url({ params: { id } })]);
  }

  paginate(event: any): void {
    this.offset = event.first / event.rows + 1;
    this.pageSize = event.rows;
    this.getSubjects()
  }

  handleClick(label: string, subject: Subject): void {
    if (!this.subjectAction.length) {
      return
    }
    if (label === this.subjectAction?.[0]?.items?.[0]?.label) {
      this.viewSubject(subject._id || "")
    }
    else if (label === this.subjectAction?.[0]?.items?.[1]?.label) {
      const dialog = this.dialog.open(EditSubjectDialogComponent, {
        data: { subject }
      })

      dialog.afterClosed().subscribe(res => {
        if (res) {
          this.getSubjects()
        }
      })
    }
  }
}
