import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home-page/home.component';
import { RoutesUtil } from '../shared/utils/routes.util';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: RoutesUtil.AuthLogin.path,
    component: AuthComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
