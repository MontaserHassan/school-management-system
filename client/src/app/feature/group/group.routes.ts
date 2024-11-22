import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesUtil } from '../shared/utils/routes.util';
import { GroupListComponent } from './pages/group-list/group-list.component';

const routes: Routes = [
  {
    path: RoutesUtil.GroupList.path,
    component: GroupListComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
