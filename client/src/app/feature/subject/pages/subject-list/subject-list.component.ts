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
  subjects!:Subject[]
  constructor(private subjectService:SubjectService , private router:Router) {
    super()
  }

  ngOnInit() {
    this.getSubjects()
  }

  getSubjects() {
    this.load(this.subjectService.getSubjects(), { isLoadingTransparent: true }).subscribe(subjects => {
      this.subjects = subjects.subject || [];
    })
  }

    viewSubject(id: string): void {
    this.router.navigate([RoutesUtil.SubjectView.url({ params: { id } })]);
  }

}
