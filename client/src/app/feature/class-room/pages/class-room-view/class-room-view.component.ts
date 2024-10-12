import { Component, OnInit } from '@angular/core';
import { ClassRoomService } from '../../services/class-room.service';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassRoom } from '../../models/class-room.model';
import { MatDialog } from '@angular/material/dialog';
import { AddTopicDialogComponent } from '../../component/add-topic-dialog/add-topic-dialog.component';
import { AddStudentToClassRoomDialogComponent } from '../../../shared/component/add-student-to-class-room-dialog/add-student-to-class-room-dialog.component';
import { RoutesUtil } from '../../../shared/utils/routes.util';
import { RolesConstants } from '../../../shared/config/roles-constants';
import { MenuItem } from 'primeng/api';
import { LeaveStudentDialogComponent } from '../../component/leave-student-dialog/leave-student-dialog.component';
import { RemoveClassroomDialogComponent } from '../../component/remove-classroom-dialog/remove-classroom-dialog.component';
import { UserRoleService } from '../../../shared/services/auth/user-role.service';
import { EditClassroomDialogComponent } from '../../component/edit-classroom-dialog/edit-classroom-dialog.component';

@Component({
  selector: 'app-class-room-view',
  templateUrl: './class-room-view.component.html',
  styleUrls: ['./class-room-view.component.scss']
})
export class ClassRoomViewComponent extends BaseComponent implements OnInit {
  mainTopics: string[] = [];
  classroom: ClassRoom = new ClassRoom();
  id!: string;
  protected RolesConstants = RolesConstants;
  studentAction!: MenuItem[];
  classroomActions!: MenuItem[];

  constructor(
    private classRoomService: ClassRoomService,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private userRoleService: UserRoleService
  ) {
    super();
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.id = params?.['id'];
      this.getClassRoomDetails(this.id);
    });

    this.generateStudentActions();
    this.generateClassroomActions();
  }

  protected override onLanguageChange(): void {
    this.generateStudentActions();
    this.generateClassroomActions();
  }

  private generateStudentActions() {
    this.studentAction = [
      {
        label: this.translate('actions'), 
        items: [
          {
            label: this.translate('viewStudent'),
            icon: 'pi pi-eye',
          },
          {
            label: this.translate('leave'),
            icon: 'pi pi-sign-out',
            visible: this.userRoleService.isUserHasRoles(RolesConstants.EDIT_DELETE_CLASS_ROOM),
          },
        ]
      }
    ];
  }

  private generateClassroomActions() {
    this.classroomActions = [
      {
        label: this.translate('actions'),
        items: [
          {
            label: this.translate('editClassroom'),
            icon: 'pi pi-pencil',
          },
          {
            label: this.translate('removeClassroom'),
            icon: 'pi pi-trash'
          },
          {
            label: this.translate('export'),
            icon: 'pi pi-file-export'
          }
        ]
      }
    ];
  }

  getClassRoomDetails(id: string, params?: { isExport?: Boolean }): void {
    this.load(this.classRoomService.getClassRoomById(id, params), { isLoadingTransparent: true }).subscribe((response) => {
      if (!params?.isExport) {
        this.classroom = response || {};
        this.mainTopics = this.classroom.mainTopics?.map(topic => topic?.topicName).filter((name): name is string => !!name) || [];
      }
    });
  }

  openAddTopicDialog(): void {
    const dialogRef = this.dialog.open(AddTopicDialogComponent, {
      width: '400px',
      data: { classRoomId: this.classroom.room }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getClassRoomDetails(this.id);
      }
    });
  }

  viewDetails(studentId: string): void {
    this.router.navigate([RoutesUtil.StudentView.url({ params: { id: studentId } })]);
  }

  openAddStudentDialog(): void {
    const dialogRef = this.dialog.open(AddStudentToClassRoomDialogComponent, {
      width: '400px',
      data: { classRoomId: this.classroom.room }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getClassRoomDetails(this.id);
      }
    });
  }

  handleClick(label: string, student: any): void {
    if (!this.studentAction.length) {
      return;
    }
    if (label === this.studentAction?.[0]?.items?.[0]?.label) {
      this.viewDetails(student.studentId || "");
    } else if (label === this.studentAction?.[0]?.items?.[1]?.label) {
      const dialog = this.dialog.open(LeaveStudentDialogComponent, {
        data: { studentId: student.studentId, roomId: this.id }
      });

      dialog.afterClosed().subscribe(res => {
        if (res) {
          this.getClassRoomDetails(this.id);
        }
      });
    }
  }

  handleClickClassroomAction(label: string, classroom: ClassRoom): void {
    if (!this.classroomActions.length) {
      return;
    }
    if (label === this.classroomActions?.[0]?.items?.[0]?.label) {
      const dialog = this.dialog.open(EditClassroomDialogComponent, {
        data: { classroom },
      });

      dialog.afterClosed().subscribe(res => {
        if (res) {
          this.getClassRoomDetails(this.id);
        }
      });
    } else if (label === this.classroomActions?.[0]?.items?.[1]?.label) {
      const dialog = this.dialog.open(RemoveClassroomDialogComponent, {
        data: { roomId: classroom._id }
      });

      dialog.afterClosed().subscribe(res => {
        if (res) {
          this.router.navigate([RoutesUtil.ClassRoomList.url()]);
        }
      });
    } else if (label === this.classroomActions?.[0]?.items?.[2]?.label) {
      this.getClassRoomDetails(this.id, { isExport: true });
    }
  }
}
