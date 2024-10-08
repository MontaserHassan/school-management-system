import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassRoom } from '../../models/class-room.model';
import { UserRole } from '../../../shared/enums/user-role.enum';
import { Lookup } from '../../../shared/enums/lookup.enum';
import { Days } from '../../../shared/config/drop-down-value.constant';

@Component({
  selector: 'app-class-room-form',
  templateUrl: './class-room-form.component.html',
  styleUrls: ['./class-room-form.component.scss']
})
export class ClassRoomFormComponent implements OnInit {
  @Input() classroomForm!: FormGroup;
  @Input() InitializeValue!: ClassRoom;

  protected Lookup = Lookup;
  protected UserRole = UserRole;

  protected days = Days

  constructor(private fb: FormBuilder) {

  }
  ngOnInit() {
    if(!this.InitializeValue){
      this.classroomForm.get("schedule")?.patchValue([this.addScheduleItem()]);
    }
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

  // Method to get the specific schedule item
  getSchedule(index: number): FormGroup {
    return this.scheduleControls.at(index) as FormGroup;
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
}
