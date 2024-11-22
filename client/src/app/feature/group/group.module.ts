import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GroupRoutingModule } from './group.routes';
import { GroupListComponent } from './pages/group-list/group-list.component';

@NgModule({
  declarations: [
    GroupListComponent
  ],

  imports: [
    CommonModule, SharedModule, GroupRoutingModule,
  ],
})
export class GroupModule { }
