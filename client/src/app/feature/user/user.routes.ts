import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { RoutesUtil } from '../shared/utils/routes.util';
import { UserListComponent } from './pages/user-list/user-list.component';
import { AddUserComponent } from './pages/add-user/add-user.component';

const routes: Routes = [
  {
    path: RoutesUtil.UserList.path,
    component: UserListComponent,
  },
  {
    path: RoutesUtil.UserProfile.path,
    component: UserViewComponent,
  },
  {
    path: RoutesUtil.AddUser.path,
    component: AddUserComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
