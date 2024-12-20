import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { RoutesUtil } from './feature/shared/utils/routes.util';
import { AuthGuard } from './feature/shared/guards/auth.guard';
import { ConfigConstant } from './feature/shared/config/config.constant';
import { LayoutComponent } from './feature/layout/pages/layout/layout.component';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
  enableTracing: false,
};

const routes: Routes = [
  {
    path: RoutesUtil.Home.path,
    loadChildren: () =>
      import(/* webpackChunkName: "Auth" */ './feature/home/home.module').then(
        (m) => m.HomeModule
      ),
  },
  {

    path: "",
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    component: LayoutComponent,
    children: [
      {
        path: RoutesUtil.Dashboard.path,
        loadChildren: () =>
          import(/* webpackChunkName: "Auth" */ './feature/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      { path: '', redirectTo: RoutesUtil.Home.url(), pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, routerOptions),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
