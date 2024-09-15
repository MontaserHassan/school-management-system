import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lookup } from '../../../shared/enums/lookup.enum';
import { UserRole } from '../../../shared/enums/user-role.enum';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { ClassRoomService } from '../../services/class-room.service';

@Component({
  selector: 'app-add-class-room',
  templateUrl: './add-class-room.component.html',
  styleUrls: ['./add-class-room.component.scss']
})
export class AddClassRoomComponent extends BaseComponent implements OnInit {
  classroomForm!: FormGroup;
  protected Lookup = Lookup;
  protected UserRole = UserRole;

  days = [
    { label: 'Sunday', value: 'Sunday' },
    { label: 'Monday', value: 'Monday' },
    { label: 'Tuesday', value: 'Tuesday' },
    { label: 'Wednesday', value: 'Wednesday' },
    { label: 'Thursday', value: 'Thursday' },
    { label: 'Friday', value: 'Friday' },
    { label: 'Saturday', value: 'Saturday' },
  ];

  constructor(private fb: FormBuilder, private classRoomService:ClassRoomService) {
    super();
  }

  ngOnInit(): void {
    this.classroomForm = this.fb.group({
      room: ['', Validators.required],
      teachersId: [[], Validators.required],
      schedule: this.fb.array([this.createScheduleItem()]),
      studentCost: ['', Validators.required],
      group: ['', Validators.required],
      mainTopics: [''],
    });
  }

  createScheduleItem(): FormGroup {
    return this.fb.group({
      day: ['', Validators.required],
      subjects: this.fb.array([this.createSubject()])
    });
  }

  createSubject(): FormGroup {
    return this.fb.group({
      subjectId: ['', Validators.required],
      startTime: [new Date(), Validators.required]
    });
  }

  get scheduleControls(): FormArray {
    return this.classroomForm.get('schedule') as FormArray;
  }

  getSubjects(index: number): FormArray {
    return this.scheduleControls.at(index).get('subjects') as FormArray;
  }

  addScheduleItem(): void {
    this.scheduleControls.push(this.createScheduleItem());
  }

  removeScheduleItem(index: number): void {
    if (this.scheduleControls.length > 1) {
      this.scheduleControls.removeAt(index);
    }
  }

  addSubject(dayIndex: number): void {
    this.getSubjects(dayIndex).push(this.createSubject());
  }

  removeSubject(dayIndex: number, subjectIndex: number): void {
    const subjectsArray = this.getSubjects(dayIndex);
    if (subjectsArray.length > 1) {
      subjectsArray.removeAt(subjectIndex);
    }
  }

  mapClassroomData(data: any): any {
    return {
      room: data.room,
      teachersId: data.teachersId.map((teacher: any) => teacher.value),
      schedule: data.schedule.map((scheduleItem: any) => ({
        day: scheduleItem.day.value,
        subjects: scheduleItem.subjects.map((subject: any) => ({
          subjectId: subject.subjectId.value,
          startTime: this.convertToTimeString(subject.startTime)
        }))
      })),
      studentCost: data.studentCost,
      group: data.group.value,
      mainTopics: data.mainTopics.map((topic: any) => topic.value)
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
      this.load(this.classRoomService.addClassRoom(classroomData), {isLoadingTransparent: true}).subscribe((res) => {
        this.showSuccessMessage('Class Room Added Successfully');
        console.log(res);

      })
    }
  }
}
