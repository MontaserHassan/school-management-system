import { Component, OnInit } from '@angular/core';
import { AddTopicDialogComponent } from '../../component/add-topic-dialog/add-topic-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Topic } from '../../models/topic.model';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { ClassRoomService } from '../../services/class-room.service';
import { MenuItem } from 'primeng/api';
import { EditTopicDialogComponent } from '../../component/edit-topic-dialog/edit-topic-dialog.component';
import { RolesConstants } from '../../../shared/config/roles-constants';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent extends BaseComponent implements OnInit {
  topics!: Topic[]
  topicAction!:MenuItem[]
  protected RolesConstants = RolesConstants

  constructor(private dialog: MatDialog, private classRoomService: ClassRoomService) {
    super();
  }

  ngOnInit(): void {
    this.getTopics();

    this.topicAction = [
      {
        label: 'Actions',
        items: [
          {
            label: 'edit',
            icon: 'pi pi-pencil'
          },
        ]
      }
    ];
  }

  getTopics(): void {
    const params = { page: this.offset.toString(), limit: this.pageSize.toString() };

    this.load(this.classRoomService.getTopics(params), { isLoadingTransparent: true }).subscribe((response) => {
      this.topics = response.topics || [];
      this.totalRowsCount = response.totalDocuments || 1;
      this.pageSize = response?.limit || 0
    })
  }

  openAddTopicDialog(): void {
    const dialogRef = this.dialog.open(AddTopicDialogComponent, {
      width: '400px',
      data: { addRoom: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTopics()
      }
    });
  }

  paginate(event: any): void {
    this.offset = event.page + 1;
    this.pageSize = event.rows;
    this.getTopics();
  }

   handleClick(label: string,topic:Topic) {
    if (!this.topicAction.length) {
      return
    }
    if (label === this.topicAction?.[0]?.items?.[0]?.label) {
      const dialog = this.dialog.open(EditTopicDialogComponent, {
        data: { topic }
      })

      dialog.afterClosed().subscribe(res => {
        if (res) {
          this.getTopics()
        }
      })
    }
  }
}
