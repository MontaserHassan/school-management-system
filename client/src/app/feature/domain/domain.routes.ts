import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesUtil } from '../shared/utils/routes.util';
import { DomainListComponent } from './pages/domain-list/domain-list.component';
import { AddDomainComponent } from './pages/add-domain/add-domain.component';
import { DomainViewComponent } from './pages/domain-view/domain-view.component';

const routes: Routes = [
  {
    path: RoutesUtil.DomainList.path,
    component: DomainListComponent,
  },
  {
    path:RoutesUtil.AddDomain.path,
    component: AddDomainComponent,
  },
  {
    path: RoutesUtil.DomainView.path,
    component: DomainViewComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomainRoutingModule { }
