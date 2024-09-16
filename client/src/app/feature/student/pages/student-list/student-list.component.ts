import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students=[
            {
                "_id": "RXKGuUQAKm3qOJjsXc9B26-Y",
                "schoolId": "HQiPO_ovyNWpxm8lSHZPxUU8",
                "studentName": "maged baraka",
                "studentCode": "N494833",
                "classRoom": "105",
                "parentId": "L1631350",
                "group": "6-9",
                "subjects": [
                    {
                        "subjectId": "pMnMfmiD_3V25Jsum9pZ91nS",
                        "subjectName": "literature"
                    }
                ],
                "mainTopics": [
                    {
                        "topicId": "6RzzeTB1nSkinzrByIefi3s2",
                        "topicName": "arithmetic operations"
                    }
                ],
                "studentCost": "405",
                "currencyOfCost": "usd",
                "attendance": [],
                "comments": [],
                "progressHistory": [],
                "createdAt": "2024-09-16T00:15:46.203Z",
                "updatedAt": "2024-09-16T00:15:46.203Z",
                "__v": 0
            },
            {
                "_id": "05MN_f4skYVk7bXXRtI2BTUm",
                "schoolId": "HQiPO_ovyNWpxm8lSHZPxUU8",
                "studentName": "ali",
                "studentCode": "N211",
                "classRoom": "105",
                "parentId": "L1631350",
                "group": "6-9",
                "subjects": [
                    {
                        "subjectId": "pMnMfmiD_3V25Jsum9pZ91nS",
                        "subjectName": "literature"
                    }
                ],
                "mainTopics": [
                    {
                        "topicId": "6RzzeTB1nSkinzrByIefi3s2",
                        "topicName": "arithmetic operations"
                    }
                ],
                "studentCost": "405",
                "currencyOfCost": "usd",
                "attendance": [],
                "comments": [],
                "progressHistory": [],
                "createdAt": "2024-09-16T00:30:06.449Z",
                "updatedAt": "2024-09-16T00:30:06.449Z",
                "__v": 0
            },
            {
                "_id": "XLJfFFxMBC14dOC5jsYoHTH6",
                "schoolId": "HQiPO_ovyNWpxm8lSHZPxUU8",
                "studentName": "ali2",
                "studentCode": "C1418177",
                "classRoom": "105",
                "parentId": "L1631350",
                "group": "6-9",
                "subjects": [
                    {
                        "subjectId": "pMnMfmiD_3V25Jsum9pZ91nS",
                        "subjectName": "literature"
                    }
                ],
                "mainTopics": [
                    {
                        "topicId": "6RzzeTB1nSkinzrByIefi3s2",
                        "topicName": "arithmetic operations"
                    }
                ],
                "studentCost": "405",
                "currencyOfCost": "usd",
                "attendance": [],
                "comments": [],
                "progressHistory": [],
                "createdAt": "2024-09-16T00:32:19.683Z",
                "updatedAt": "2024-09-16T00:32:19.683Z",
                "__v": 0
            }
        ]
  constructor() { }

  ngOnInit() {
  }

}
