import { Component, OnInit } from '@angular/core';
import { AddTopicDialogComponent } from '../../component/add-topic-dialog/add-topic-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {
 topics = [
    {
      "_id": "hu3ZlD6_LJ8Wd1-YLrbZleJw",
      "topicName": "fr letter",
      "createdAt": "2024-09-22T13:52:23.075Z",
      "updatedAt": "2024-09-22T13:52:23.075Z"
    },
    {
      "_id": "asdL3lD6_LJ8Wd1-YLrbZleJK",
      "topicName": "math operations",
      "createdAt": "2024-09-20T10:22:43.075Z",
      "updatedAt": "2024-09-20T10:22:43.075Z"
    }
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  addTopic(): void {
    console.log('Add New Topic');
  }

  openAddTopicDialog(): void {
    const dialogRef = this.dialog.open(AddTopicDialogComponent, {
      width: '400px',
      data: { addRoom: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }
}
