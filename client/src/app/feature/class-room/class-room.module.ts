import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CLassRoomRoutingModule } from './class-room.routes';
import { SharedModule } from '../shared/shared.module';
import { ClassRoomViewComponent } from './pages/class-room-view/class-room-view.component';
import { AddClassRoomComponent } from './pages/add-class-room/add-class-room.component';
import { ClassRoomListComponent } from './pages/class-room-list/class-room-list.component';
import { AddTopicDialogComponent } from './component/add-topic-dialog/add-topic-dialog.component';
import { TopicListComponent } from './pages/topic-list/topic-list.component';
import { EditTopicDialogComponent } from './component/edit-topic-dialog/edit-topic-dialog.component';
import { LeaveStudentDialogComponent } from './component/leave-student-dialog/leave-student-dialog.component';
import { RemoveClassroomDialogComponent } from './component/remove-classroom-dialog/remove-classroom-dialog.component';
import { ClassRoomFormComponent } from './component/class-room-form/class-room-form.component';
import { EditClassroomDialogComponent } from './component/edit-classroom-dialog/edit-classroom-dialog.component';


@NgModule({
  declarations: [
    ClassRoomViewComponent,
    AddClassRoomComponent,
    ClassRoomListComponent,
    AddTopicDialogComponent,
    TopicListComponent,
    EditTopicDialogComponent,
    LeaveStudentDialogComponent,
    RemoveClassroomDialogComponent,
    ClassRoomFormComponent,
    EditClassroomDialogComponent
  ],
  imports: [
    CommonModule, SharedModule, CLassRoomRoutingModule,
  ],
})
export class CLassRoomModule { }
