import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CycleListComponent } from './pages/cycle-list/cycle-list.component';
import { CycleRoutingModule } from './cycle.routes';
import { SharedModule } from 'primeng/api';




@NgModule({
  declarations: [
    CycleListComponent
  ],
  imports: [
    CommonModule,
    CycleRoutingModule,
    SharedModule
  ]
})
export class CycleModule { }
