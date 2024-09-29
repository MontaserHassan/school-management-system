import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user.routes';
import { SharedModule } from '../shared/shared.module';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { AddParentComponent } from './pages/add-parent/add-parent.component';

@NgModule({
  declarations: [
    UserViewComponent,
    UserListComponent,
    AddUserComponent,
    AddParentComponent
  ],
  imports: [
    CommonModule, SharedModule, UserRoutingModule,
  ],
})
export class UserModule { }
