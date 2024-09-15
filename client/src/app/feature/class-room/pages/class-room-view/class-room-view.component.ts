import { Component, OnInit } from '@angular/core';
import { ClassRoomService } from '../../services/class-room.service';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { ActivatedRoute } from '@angular/router';
import { ClassRoom } from '../../models/class-room.model';

@Component({
  selector: 'app-class-room-view',
  templateUrl: './class-room-view.component.html',
  styleUrls: ['./class-room-view.component.scss']
})
export class ClassRoomViewComponent extends BaseComponent implements OnInit {
  mainTopics: string[] = [];
  classroom!: ClassRoom
  constructor(private classRoomService: ClassRoomService, private activeRoute: ActivatedRoute) {
    super()
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      const id = params?.['id']
      this.getClassRoomDetails(id)
    })

  }

  getClassRoomDetails(id: string): void {
    this.load(this.classRoomService.getClassRoomById(id), { isLoadingTransparent: true }).subscribe((response) => {
      this.classroom = response || {}
      this.mainTopics = this.classroom.mainTopics?.map(topic => topic?.topicName).filter((name): name is string => !!name) || [];
    })
  }

}

