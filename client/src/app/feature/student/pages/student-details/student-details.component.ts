import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { Degree } from '../../enums/degree.enum';
import { Student } from '../../models/student.model';
import { Topic } from '../../../class-room/models/topic.model';
import { AttendanceCalenderComponent } from '../../component/attendance-calender/attendance-calender.component';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentDialogComponent } from '../../component/add-comment-dialog/add-comment-dialog.component';
@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent extends BaseComponent implements OnInit {
  studentProfile: Student = new Student();
  mainTopics: Topic[] = [];
  displayDialog: boolean = false;
  selectedComment: any = null;
  protected degree = Degree


  constructor(
    private studentService: StudentService,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    super()
  }

  @ViewChild('attendanceCalendar') attendanceCalendar!: AttendanceCalenderComponent;

  onTabChange(event: any) {
    if (event.index === 2) {
      this.attendanceCalendar.showCalendar();
    } else {
      this.attendanceCalendar.hideCalendar();
    }
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      const id = params?.['id']
      if (id) {
        this.getStudentDetails(id);
      }
    })
  }

  getStudentDetails(id: string) {
    this.load(this.studentService.getStudentById(id), { isLoadingTransparent: true }).subscribe(res => {
      this.studentProfile = res;
      this.mainTopics = this.studentProfile.mainTopics.map((topic: any) => topic?.topicName);
    })
  }

  setDegreeColor(degree: string): "success" | undefined {
    return Degree[degree as keyof typeof Degree] || undefined;
  }

  handleEventClick(info: any): void {
    alert('Status: ' + info.event.title + '\nComment: ' + info.event.extendedProps.description);
  }


  openCommentDialog(comment: any) {
    this.selectedComment = comment;
    this.displayDialog = true;
  }

  onDialogHide() {
    this.selectedComment = null;
  }

  openAddCommentDialog(){
    const dialog = this.dialog.open(AddCommentDialogComponent, {
      width: '500px',
      data: {
        studentId: this.studentProfile._id
      }
    })

    dialog.afterClosed().subscribe((res) => {
      if(res){
        this.studentProfile.comments = res.comments;
      }
    })
  }
}
