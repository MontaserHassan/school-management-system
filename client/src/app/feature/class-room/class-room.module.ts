import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CLassRoomRoutingModule } from './class-room.routes';
import { SharedModule } from '../shared/shared.module';
import { ClassRoomViewComponent } from './pages/class-room-view/class-room-view.component';
import { AddClassRoomComponent } from './pages/add-class-room/add-class-room.component';
import { ClassRoomListComponent } from './pages/class-room-list/class-room-list.component';
import { AddSkillDialogComponent } from './component/add-skill-dialog/add-skill-dialog.component';
import { SkillListComponent } from './pages/skill-list/skill-list.component';
import { EditSkillDialogComponent } from './component/edit-skill-dialog/edit-skill-dialog.component';
import { LeaveStudentDialogComponent } from './component/leave-student-dialog/leave-student-dialog.component';
import { RemoveClassroomDialogComponent } from './component/remove-classroom-dialog/remove-classroom-dialog.component';
import { ClassRoomFormComponent } from './component/class-room-form/class-room-form.component';
import { EditClassroomDialogComponent } from './component/edit-classroom-dialog/edit-classroom-dialog.component';
import { ActivityListComponent } from './pages/activity-list/activity-list.component';
import { AddActivityDialogComponent } from './component/add-activity-dialog/add-activity-dialog.component';
import { EditActivityDialogComponent } from './component/edit-activity-dialog/edit-activity-dialog.component';


@NgModule({
  declarations: [
    ClassRoomViewComponent,
    AddClassRoomComponent,
    ClassRoomListComponent,
    AddSkillDialogComponent,
    SkillListComponent,
    EditSkillDialogComponent,
    LeaveStudentDialogComponent,
    RemoveClassroomDialogComponent,
    ClassRoomFormComponent,
    EditClassroomDialogComponent,
    ActivityListComponent,
    AddActivityDialogComponent,
    EditActivityDialogComponent
  ],
  imports: [
    CommonModule, SharedModule, CLassRoomRoutingModule,
  ],
})
export class CLassRoomModule { }
