import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClassRoom } from '../../models/class-room.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassRoomService } from '../../services/class-room.service';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { Currency, Days, Group } from '../../../shared/config/drop-down-value.constant';

@Component({
  selector: 'app-edit-classroom-dialog',
  templateUrl: './edit-classroom-dialog.component.html',
  styleUrls: ['./edit-classroom-dialog.component.scss']
})
export class EditClassroomDialogComponent extends BaseComponent implements OnInit {
  classroomForm!: FormGroup;

  protected days = Days
  protected currency = Currency
  protected group = Group

  constructor(
    private dialogRef: MatDialogRef<EditClassroomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { classroom: ClassRoom },
    private fb: FormBuilder, private classRoomService: ClassRoomService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.classroomForm = this.fb.group({
      room: [this.data.classroom.room, Validators.required],
      teachersId: [(this.data.classroom.teachers || []).map((teacher: any) => ({value:teacher.teacherId , label:teacher.teacherName})), Validators.required],
      schedule: this.fb.array((this.data?.classroom?.schedule || []).map((scheduleItem: any) =>
        this.fb.group({
          day: [this.days.find(el => el.label === scheduleItem.day)|| ""],
          subjects: this.fb.array(scheduleItem.subjects.map((subject: any) =>
            this.fb.group({
              subjectId: [{value:subject.subjectId, label:subject.subjectName}],
              startTime: [subject.startTime],
            })
          ) || [])
        })
      )),
      studentCost: [this.data.classroom.studentCost, Validators.required],
      currencyOfCost: [this.currency.find(el=> el.label === this.data.classroom.currencyOfCost) || "", Validators.required],
      group: [this.group.find(el=> el.label === this.data.classroom.group), Validators.required],
      mainTopics: [this.data.classroom.mainTopics?.map(el => ({value:el.topicId, label:el.topicName})) || ''],
    });
  }

  mapClassroomData(data: any): any {
    return {
      roomId: this.data.classroom._id,
      room: data?.room,
      teachersId: data?.teachersId?.map((teacher: any) => teacher.value),
      schedule: data?.schedule?.map((scheduleItem: any) => ({
        day: scheduleItem.day.value,
        subjects: scheduleItem?.subjects.map((subject: any) => ({
          subjectId: subject?.subjectId.value,
          startTime: typeof subject.startTime  === 'string' ? subject.startTime : this.convertToTimeString(subject.startTime)
        }))
      })),
      studentCost: data?.studentCost,
      currencyOfCost: data?.currencyOfCost.value,
      group: data?.group.value,
      mainTopics: data?.mainTopics ? data?.mainTopics?.map((topic: any) => topic.value) : null
    };
  }

  convertToTimeString(dateString: string): string {
    const date = new Date(dateString);

    let hours = date.getHours();
    let minutes = date.getMinutes();

    const formattedHours = hours < 10 ? '0' + hours : hours.toString();
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();

    return `${formattedHours}:${formattedMinutes}`;
  }

  onSubmit(): void {
    if (this.classroomForm.valid) {
      const classroomData = this.mapClassroomData(this.classroomForm.value);
      this.load(this.classRoomService.editClassRoom(classroomData), { isLoadingTransparent: true }).subscribe((res) => {
        this.showSuccessMessage('Class Room Edited Successfully');
        this.dialogRef.close(true);
      })
    }
  }
}