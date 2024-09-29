import { Component, OnInit } from '@angular/core';
import { ClassRoomService } from '../../services/class-room.service';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassRoom } from '../../models/class-room.model';
import { MatDialog } from '@angular/material/dialog';
import { AddTopicDialogComponent } from '../../component/add-topic-dialog/add-topic-dialog.component';
import { AddStudentToClassRoomDialogComponent } from '../../../shared/component/add-student-to-class-room-dialog/add-student-to-class-room-dialog.component';
import { RoutesUtil } from '../../../shared/utils/routes.util';

@Component({
  selector: 'app-class-room-view',
  templateUrl: './class-room-view.component.html',
  styleUrls: ['./class-room-view.component.scss']
})
export class ClassRoomViewComponent extends BaseComponent implements OnInit {
  mainTopics: string[] = [];
  classroom: ClassRoom = new ClassRoom();
  id!: string

  constructor(private classRoomService: ClassRoomService, private activeRoute: ActivatedRoute, private dialog: MatDialog, private router: Router) {
    super()
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.id = params?.['id']
      this.getClassRoomDetails(this.id)
    })

  }

  getClassRoomDetails(id: string): void {
    this.load(this.classRoomService.getClassRoomById(id), { isLoadingTransparent: true }).subscribe((response) => {
      this.classroom = response || {}
      this.mainTopics = this.classroom.mainTopics?.map(topic => topic?.topicName).filter((name): name is string => !!name) || [];
    })
  }

  openAddTopicDialog(): void {
    const dialogRef = this.dialog.open(AddTopicDialogComponent, {
      width: '400px',
      data: { classRoomId: this.classroom.room }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getClassRoomDetails(this.id)
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
        this.getClassRoomDetails(this.id)
      }
    })
  }
}

