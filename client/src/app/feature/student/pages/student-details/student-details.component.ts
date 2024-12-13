import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { Degree } from '../../enums/degree.enum';
import { Student, Domain } from '../../models/student.model';
import { Skill } from '../../../class-room/models/skill.model';
import { AttendanceCalenderComponent } from '../../component/attendance-calender/attendance-calender.component';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentDialogComponent } from '../../component/add-comment-dialog/add-comment-dialog.component';
import { MenuItem, MessageService } from 'primeng/api';
import { AddStudentToClassRoomDialogComponent } from '../../../shared/component/add-student-to-class-room-dialog/add-student-to-class-room-dialog.component';
import { EditStudentDialogComponent } from '../../component/edit-student-dialog/edit-student-dialog.component';
import { RolesConstants } from '../../../shared/config/roles-constants';
import { DegreeStatus } from '../../../shared/config/drop-down-value.constant';
import { Activity } from '../../../class-room/models/activity.model';
@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent extends BaseComponent implements OnInit {
  @ViewChild('attendanceCalendar') attendanceCalendar!: AttendanceCalenderComponent;

  studentProfile: Student = new Student();
  displayDialog: boolean = false;
  selectedComment: any = null;
  protected degree = Degree
  protected RolesConstants = RolesConstants


  protected degreeStatus = DegreeStatus

  degreeOption: MenuItem[] = this.degreeStatus.map((status) => ({ icon: "pi pi-star-fill", label: status._id }));
  id!: string;

  studentAction!: MenuItem[];

  constructor(
    private studentService: StudentService,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {
    super()
  }


  onTabChange(event: any) {
    if (event.index === 3) {
      this.attendanceCalendar.showCalendar();
    } else {
      this.attendanceCalendar.hideCalendar();
    }
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.id = params?.['id']
      if (this.id) {
        this.getStudentDetails(this.id);
      }
    })
    this.generateStudentAction()
  }

  protected override onLanguageChange(): void {
    this.generateStudentAction();
  }

  generateStudentAction() {
    this.studentAction = [
      {
        label: this.translate('actions'),
        items: [
          {
            label: this.translate('edit'),
            icon: 'pi pi-pencil'
          },
          {
            label: this.translate('export'),
            icon: 'pi pi-file-export'
          },
        ]
      }
    ];
  }

  getStudentDetails(id: string, params?: { isExport?: boolean }) {
    this.load(this.studentService.getStudentById(id, params), { isLoadingTransparent: true }).subscribe(res => {
      if (!params?.isExport) {
        this.studentProfile = res;
      }
    })
  }

  updateDegree(id: string, activity: Activity) {
    const activityId = activity.activityId || '';
    const studentId = this.studentProfile._id;
    const payload = {
      studentId,
      activityId,
      degree: id
    }
    this.load(this.studentService.updateStudentDegree(payload), { isLoadingTransparent: true }).subscribe(res => {
      this.getStudentDetails(this.id);
    })
  }

  setDegreeColor(degree: string): "success" | "secondary" | "warning" | undefined {
    return Degree[degree as keyof typeof Degree] || undefined;
  }

  openCommentDialog(comment: any) {
    this.selectedComment = comment;
    this.displayDialog = true;
  }

  onDialogHide() {
    this.selectedComment = null;
  }

  // Check if media is an image
  isImage(base64: string): boolean {
    return base64.startsWith('data:image/');
  }

  // Check if media is a PDF
  isPDF(base64: string): boolean {
    return base64.startsWith('data:application/pdf');
  }

  // Sanitize media to be used in an iframe
  sanitizedMedia(base64: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64);
  }

  openAddCommentDialog() {
    const dialog = this.dialog.open(AddCommentDialogComponent, {
      width: '500px',
      data: {
        studentId: this.studentProfile._id
      }
    })

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.studentProfile.comments = res.comments;
      }
    })
  }

  updateStudentProfile(event: Student) {
    this.getStudentDetails(this.id);
  }

  handleAddStudentToClassRoom() {
    const dialog = this.dialog.open(AddStudentToClassRoomDialogComponent, {
      width: '500px',
      data: {
        studentId: this.studentProfile._id
      }
    })

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.getStudentDetails(this.id);
      }
    })
  }

  handleClick(label: string): void {
    if (!this.studentAction.length) {
      return
    }
    if (label === this.studentAction?.[0]?.items?.[0]?.label) {
      const dialog = this.dialog.open(EditStudentDialogComponent, {
        data: { student: this.studentProfile }
      })

      dialog.afterClosed().subscribe(res => {
        if (res) {
          this.getStudentDetails(this.id);
        }
      })
    }
    else if (label === this.studentAction?.[0]?.items?.[1]?.label) {
      this.getStudentDetails(this.id, { isExport: true })
    }
  }
}
