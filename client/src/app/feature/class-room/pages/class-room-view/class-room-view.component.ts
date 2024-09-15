import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-class-room-view',
  templateUrl: './class-room-view.component.html',
  styleUrls: ['./class-room-view.component.scss']
})
export class ClassRoomViewComponent implements OnInit {
  mainTopics: string[] = []; // Array to hold topic names as strings

  constructor() { }

  ngOnInit() {

    this.mainTopics = this.classroom.mainTopics.map(topic => topic.topicName);

  }

   classroom = {
      _id: "UHg_FnlIxLVuxqqB3tsQkmKm",
      schoolId: "HQiPO_ovyNWpxm8lSHZPxUU8",
      room: "105",
      group: "6-9",
      teachers: [
        { teacherId: "wpr7VC3R2Qh1uZ-bWDa2G", teacherName: "teacher 2" }
      ],
      mainTopics: [
        { topicId: "6RzzeTB1nSkinzrByIefi3s2", topicName: "arithmetic operations" }
      ],
      schedule: [
        {
          day: "Sunday",
          subjects: [
            {
              subjectId: "pMnMfmiD_3V25Jsum9pZ91nS",
              subjectName: "literature",
              startTime: "21:31",
              endTime: "23:11"
            }
          ]
        }
      ],
      studentCost: "405",
      currencyOfCost: "usd",
      students: [],
      createdAt: "2024-09-15T18:31:51.010Z",
      updatedAt: "2024-09-15T18:31:51.010Z"
    };
  }

