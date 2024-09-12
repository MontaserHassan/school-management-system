import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard.routes';
import { HiComponent } from './pages/hi/hi.component';

@NgModule({
  declarations: [
    HiComponent
  ],

  imports: [
    CommonModule, SharedModule, DashboardRoutingModule,
  ],
})
export class DashboardModule { }
