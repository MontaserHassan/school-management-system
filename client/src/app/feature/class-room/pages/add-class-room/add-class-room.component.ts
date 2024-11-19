import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lookup } from '../../../shared/enums/lookup.enum';
import { UserRole } from '../../../shared/enums/user-role.enum';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { ClassRoomService } from '../../services/class-room.service';
import { RoutesUtil } from '../../../shared/utils/routes.util';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-class-room',
  templateUrl: './add-class-room.component.html',
  styleUrls: ['./add-class-room.component.scss']
})
export class AddClassRoomComponent extends BaseComponent implements OnInit {
  classroomForm!: FormGroup;

  constructor(private fb: FormBuilder, private classRoomService:ClassRoomService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.classroomForm = this.fb.group({
      room: ['', Validators.required],
      teachersId: ['', Validators.required],
      schedule: this.fb.array([]),
      studentCost: ['', Validators.required],
      currencyOfCost: ['', Validators.required],
      group: ['', Validators.required],
      mainTopics: [''],
    });
  }

  mapClassroomData(data: any): any {
    return {
      room: data?.room,
      teachersId: data?.teachersId?.map((teacher: any) => teacher.value),
      schedule: data?.schedule?.map((scheduleItem: any) => ({
        day: scheduleItem.day.value,
        domains: scheduleItem?.domains.map((domain: any) => ({
          domainId: domain?.domainId.value,
          startTime: this.convertToTimeString(domain.startTime)
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
      this.load(this.classRoomService.addClassRoom(classroomData), {isLoadingTransparent: true}).subscribe((res) => {
        this.showSuccessMessage('classroom.classRoomAddedSuccessfully');
        this.router.navigate([RoutesUtil.ClassRoomView.url({ params: { id: res._id } })]);
      })
    }
  }
}
