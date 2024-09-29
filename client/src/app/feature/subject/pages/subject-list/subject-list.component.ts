import { Component, OnInit } from '@angular/core';
import { Subject } from '../../models/subject.model';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { SubjectService } from '../../services/subject.service';
import { Router } from '@angular/router';
import { RoutesUtil } from '../../../shared/utils/routes.util';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent extends BaseComponent implements OnInit {
  subjects!: Subject[]
  constructor(private subjectService: SubjectService, private router: Router) {
    super()
  }

  ngOnInit() {
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
}
