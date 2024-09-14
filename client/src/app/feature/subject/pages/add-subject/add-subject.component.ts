import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { SubjectService } from '../../services/subject.service';
import { Router } from '@angular/router';
import { RoutesUtil } from '../../../shared/utils/routes.util';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent extends BaseComponent implements OnInit {
  subjectForm!: FormGroup;

  constructor(private fb: FormBuilder, private subjectService: SubjectService, private router: Router) {
    super()
  }

  ngOnInit(): void {
    this.subjectForm = this.fb.group({
      subjectName: ['', Validators.required],
      courseTime: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  onSubmit() {
    if (this.subjectForm.valid) {
      const newSubject = this.subjectForm.value;
      this.load(this.subjectService.addSubject(newSubject), { isLoadingTransparent: true }).subscribe(subject => {
        this.router.navigate([RoutesUtil.SubjectView.url({ params: { id: subject._id } })])
      })
    }
  }
}
