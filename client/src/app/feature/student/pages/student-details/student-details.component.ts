import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {
  studentProfile: any;
  mainTopics: any[] = []; // Array to handle main topics as chips

  constructor() { }

  ngOnInit(): void {
    // Mock student profile data, replace with actual API call
    this.studentProfile = {
      schoolId: "HQiPO_ovyNWpxm8lSHZPxUU8",
      studentName: "ali2",
      studentCode: "C1418177",
      classRoom: "105",
      parentId: "L1631350",
      group: "6-9",
      subjects: [
        { subjectId: "pMnMfmiD_3V25Jsum9pZ91nS", subjectName: "Literature" }
      ],
      mainTopics: [
        { topicId: "6RzzeTB1nSkinzrByIefi3s2", topicName: "Arithmetic Operations" }
      ],
      studentCost: "405",
      currencyOfCost: "USD",
      attendance: [
        { date: "2024-09-01", status: "Present" },
        { date: "2024-09-02", status: "Absent" },
      ],
      comments: [
        { date: "2024-09-03", comment: "Good progress this month." }
      ],
      progressHistory: [
        { date: "2024-09-04", progress: "Completed 50% of the syllabus." }
      ],
      createdAt: new Date("2024-09-16T00:32:19.683Z"),
      updatedAt: new Date("2024-09-16T00:32:19.683Z"),
      _id: "XLJfFFxMBC14dOC5jsYoHTH6",
    };

          this.mainTopics = this.studentProfile.mainTopics.map((topic: any) => topic?.topicName);

  }
}
