import { Component, OnInit } from '@angular/core';
import { AddTopicDialogComponent } from '../../component/add-topic-dialog/add-topic-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Topic } from '../../models/topic.model';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { ClassRoomService } from '../../services/class-room.service';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent extends BaseComponent implements OnInit {
  topics!: Topic[]

  constructor(private dialog: MatDialog, private classRoomService: ClassRoomService) {
    super();
  }

  ngOnInit(): void {
    this.getTopics();
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
}
