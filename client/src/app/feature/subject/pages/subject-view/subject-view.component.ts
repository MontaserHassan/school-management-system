import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from '../../models/subject.model';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-subject-view',
  templateUrl: './subject-view.component.html',
  styleUrls: ['./subject-view.component.scss']
})
export class SubjectViewComponent extends BaseComponent implements OnInit {
  id?: string;
  subject:Subject = new Subject();
  constructor(private activatedRoute: ActivatedRoute,private subjectService:SubjectService) {
    super()
  }

  ngOnInit() {
    this.id =  this.activatedRoute.snapshot.params?.['id'];
    this.getSubjectById()
  }

  getSubjectById() {
    this.load(this.subjectService.getSubjectById(this.id || ""), { isLoadingTransparent: true }).subscribe(subject => {
      this.subject = subject;
      console.log(this.subject);

    })
  }
}
