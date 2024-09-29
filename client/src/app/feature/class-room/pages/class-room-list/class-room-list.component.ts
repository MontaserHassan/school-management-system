import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesUtil } from '../../../shared/utils/routes.util';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { ClassRoomService } from '../../services/class-room.service';
import { ClassRoom } from '../../models/class-room.model';

@Component({
  selector: 'app-class-room-list',
  templateUrl: './class-room-list.component.html',
  styleUrls: ['./class-room-list.component.scss']
})
export class ClassRoomListComponent extends BaseComponent implements OnInit {
  classrooms!:ClassRoom[]
  constructor(private router: Router ,private classRoomService:ClassRoomService) {
    super()
  }

  ngOnInit() {
  }

  getClassRoomList(): void {
    const params = { page: this.offset, limit: this.pageSize};

    this.load(this.classRoomService.getClassRoomList(params),{isLoadingTransparent: true}).subscribe((response) => {
      this.classrooms = response?.rooms || []
      this.totalRowsCount = response.totalDocuments || 1;
      this.pageSize = response?.limit || 0
    })
  }

  viewDetails(classroomId: string): void {
    this.router.navigate([RoutesUtil.ClassRoomView.url({ params: { id: classroomId } })]);
  }

  paginate(event: any): void {
    this.offset =  event.first / event.rows + 1;
    this.pageSize = event.rows;
    this.getClassRoomList();
  }
}
