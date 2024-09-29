import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CLassRoomRoutingModule } from './class-room.routes';
import { SharedModule } from '../shared/shared.module';
import { ClassRoomViewComponent } from './pages/class-room-view/class-room-view.component';
import { AddClassRoomComponent } from './pages/add-class-room/add-class-room.component';
import { ClassRoomListComponent } from './pages/class-room-list/class-room-list.component';
import { AddTopicDialogComponent } from './component/add-topic-dialog/add-topic-dialog.component';
import { TopicListComponent } from './pages/topic-list/topic-list.component';


@NgModule({
  declarations: [
    ClassRoomViewComponent,
    AddClassRoomComponent,
    ClassRoomListComponent,
    AddTopicDialogComponent,
    TopicListComponent,
  ],
  imports: [
    CommonModule, SharedModule, CLassRoomRoutingModule,
  ],
})
export class CLassRoomModule { }
