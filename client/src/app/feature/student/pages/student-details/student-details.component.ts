import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../shared/component/base-component/base.component';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent extends BaseComponent implements OnInit {
  studentProfile: any;
  mainTopics: any[] = [];

  constructor(
    private studentService: StudentService,
    private activeRoute: ActivatedRoute,
  ) {
    super()
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      const id = params?.['id']
      if (id) {
        this.getStudentDetails(id);
      }
    })
  }

  getStudentDetails(id:string) {
    this.load(this.studentService.getStudentById(id), { isLoadingTransparent: true }).subscribe(res => {
        this.studentProfile = res;
        this.mainTopics = this.studentProfile.mainTopics.map((topic: any) => topic?.topicName);
    })
  }
}
