import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HiComponent } from './pages/hi/hi.component';

const routes: Routes = [
  {
    path: '',
    component: HiComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
