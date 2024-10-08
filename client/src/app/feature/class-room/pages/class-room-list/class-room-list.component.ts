import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesUtil } from '../../../shared/utils/routes.util';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { ClassRoomService } from '../../services/class-room.service';
import { ClassRoom } from '../../models/class-room.model';
import { MenuItem } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { RemoveClassroomDialogComponent } from '../../component/remove-classroom-dialog/remove-classroom-dialog.component';
import { UserRoleService } from '../../../shared/services/auth/user-role.service';
import { RolesConstants } from '../../../shared/config/roles-constants';
import { EditClassroomDialogComponent } from '../../component/edit-classroom-dialog/edit-classroom-dialog.component';

@Component({
  selector: 'app-class-room-list',
  templateUrl: './class-room-list.component.html',
  styleUrls: ['./class-room-list.component.scss']
})
export class ClassRoomListComponent extends BaseComponent implements OnInit {
  classrooms!:ClassRoom[]
  classroomActions!:MenuItem[]
  constructor(private router: Router ,private classRoomService:ClassRoomService, private matDialog: MatDialog, private userRoleService:UserRoleService) {
    super()
  }

  ngOnInit() {
    this.classroomActions = [
      {
        label: 'Actions',
        items: [
          {
            label: 'View',
            icon: 'pi pi-eye',
          },
          {
            label: 'Edit Classroom',
            icon: 'pi pi-pencil',
            visible: this.userRoleService.isUserHasRoles(RolesConstants.EDIT_DELETE_CLASS_ROOM),
          },
          {
            label: 'Remove Classroom',
            icon: 'pi pi-trash',
            visible: this.userRoleService.isUserHasRoles(RolesConstants.EDIT_DELETE_CLASS_ROOM),
          }
        ]
      }
    ];
  }

  getClassRoomList(): void {
    const params = { page: this.offset, limit: this.pageSize};

    this.load(this.classRoomService.getClassRoomList(params),{isLoadingTransparent: true}).subscribe((response) => {
      this.classrooms = response?.rooms || []
      this.totalRowsCount = response.totalDocuments || 1;
      this.pageSize = response?.limit || 0
    }, (error) => {
      this.classrooms = []
    })
  }

  viewDetails(classroomId: string): void {
    this.router.navigate([RoutesUtil.ClassRoomView.url({ params: { id: classroomId } })]);
  }

  paginate(event: any): void {
    this.offset =  event.first / event.rows + 1;
    this.pageSize = event.rows;
    this.getClassRoomList();
  }

  handleClick(label: string, classroom: ClassRoom): void {
    if (!this.classroomActions.length) {
      return
    }
    if (label === this.classroomActions?.[0]?.items?.[0]?.label) {
      this.viewDetails(classroom._id || "");
    }
    else if (label === this.classroomActions?.[0]?.items?.[1]?.label) {
      const dialog = this.matDialog.open(EditClassroomDialogComponent, {
        data: { classroom },
      })

      dialog.afterClosed().subscribe(res => {
        if (res) {
          this.getClassRoomList()
        }
      })
    }
    else if (label === this.classroomActions?.[0]?.items?.[2]?.label) {
      const dialog = this.matDialog.open(RemoveClassroomDialogComponent, {
        data: { roomId: classroom._id }
      })

      dialog.afterClosed().subscribe(res => {
        if (res) {
          this.getClassRoomList()
        }
      })
    }
  }
}
