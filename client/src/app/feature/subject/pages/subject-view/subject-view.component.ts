import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from '../../models/subject.model';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { SubjectService } from '../../services/subject.service';
import { MenuItem } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { EditSubjectDialogComponent } from '../../components/edit-subject-dialog/edit-subject-dialog.component';

@Component({
  selector: 'app-subject-view',
  templateUrl: './subject-view.component.html',
  styleUrls: ['./subject-view.component.scss']
})
export class SubjectViewComponent extends BaseComponent implements OnInit {
  id?: string;
  subject:Subject = new Subject();
  subjectAction!:MenuItem[]

  constructor(private activatedRoute: ActivatedRoute,private subjectService:SubjectService, private dialog: MatDialog) {
    super()
  }

  ngOnInit() {
    this.id =  this.activatedRoute.snapshot.params?.['id'];
    this.getSubjectById()

    this.subjectAction = [
      {
        label: 'Actions',
        items: [
          {
            label: 'edit',
            icon: 'pi pi-pencil'
          },
        ]
      }
    ];
  }

  getSubjectById() {
    this.load(this.subjectService.getSubjectById(this.id || ""), { isLoadingTransparent: true }).subscribe(subject => {
      this.subject = subject;
    })
  }

  handleClick(label: string): void {
    if (!this.subjectAction.length) {
      return
    }
    if (label === this.subjectAction?.[0]?.items?.[0]?.label) {
      const dialog = this.dialog.open(EditSubjectDialogComponent, {
        data: { subject : this.subject },
      })

      dialog.afterClosed().subscribe(res => {
        if (res) {
          this.getSubjectById()
        }
      })
    }
  }
}
