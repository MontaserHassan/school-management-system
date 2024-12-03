import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesUtil } from '../shared/utils/routes.util';
import { CycleListComponent } from './pages/cycle-list/cycle-list.component';

const routes: Routes = [
  {
    path: RoutesUtil.CycleDomains.path,
    component: CycleListComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CycleRoutingModule { }
