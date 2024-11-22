import { Component, OnInit } from '@angular/core';
import { Activity } from '../../models/activity.model';
import { MenuItem } from 'primeng/api';
import { RolesConstants } from '../../../shared/config/roles-constants';
import { MatDialog } from '@angular/material/dialog';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { ClassRoomService } from '../../services/class-room.service';
import { AddActivityDialogComponent } from '../../component/add-activity-dialog/add-activity-dialog.component';
import { EditActivityDialogComponent } from '../../component/edit-activity-dialog/edit-activity-dialog.component';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent extends BaseComponent implements OnInit {
  activities!: Activity[]
  activityAction!:MenuItem[]
  protected RolesConstants = RolesConstants

  constructor(private dialog: MatDialog, private classRoomService: ClassRoomService) {
    super();
  }

  ngOnInit(): void {
    this.getActivities();
    this.generateMenu();
  }

  protected override onLanguageChange(): void {
    this.generateMenu();
  }

  generateMenu(): void {
    this.activityAction = [
      {
        label: this.translate('actions'),
        items: [
          {
            label: this.translate('edit'),
            icon: 'pi pi-pencil'
          },
        ]
      }
    ];
  }

  getActivities(): void {
    const params = { page: this.offset.toString(), limit: this.pageSize.toString() };

    this.load(this.classRoomService.getActivities(params), { isLoadingTransparent: true }).subscribe((response) => {
      this.activities = response.activities || [];
      this.totalRowsCount = response.totalDocuments || 1;
      this.pageSize = response?.limit || 0
    })
  }

  openAddActivityDialog(): void {
    const dialogRef = this.dialog.open(AddActivityDialogComponent, {
      width: '400px',
      data: { addRoom: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getActivities()
      }
    });
  }

  paginate(event: any): void {
    this.offset = event.page + 1;
    this.pageSize = event.rows;
    this.getActivities();
  }

  handleClick(label: string, activity: Activity) {
    if (!this.activityAction.length) {
      return
    }
    if (label === this.activityAction?.[0]?.items?.[0]?.label) {
      const dialog = this.dialog.open(EditActivityDialogComponent, {
        data: { activity }
      })

      dialog.afterClosed().subscribe(res => {
        if (res) {
          this.getActivities()
        }
      })
    }
  }
}
