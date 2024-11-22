import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesUtil } from '../shared/utils/routes.util';
import { ClassRoomListComponent } from './pages/class-room-list/class-room-list.component';
import { AddClassRoomComponent } from './pages/add-class-room/add-class-room.component';
import { ClassRoomViewComponent } from './pages/class-room-view/class-room-view.component';
import { SkillListComponent } from './pages/skill-list/skill-list.component';
import { ActivityListComponent } from './pages/activity-list/activity-list.component';

const routes: Routes = [
  {
    path:RoutesUtil.ClassRoomList.path,
    component: ClassRoomListComponent,
  },
  {
    path:RoutesUtil.AddClassRoom.path,
    component: AddClassRoomComponent
  },
  {
    path:RoutesUtil.ClassRoomView.path,
    component: ClassRoomViewComponent
  },
  {
    path:RoutesUtil.SkillsList.path,
    component: SkillListComponent
  },
  {
    path:RoutesUtil.ActivityList.path,
    component: ActivityListComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CLassRoomRoutingModule { }
