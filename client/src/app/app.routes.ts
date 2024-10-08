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
      {
        path: RoutesUtil.User.path,
        loadChildren: () =>
          import(/* webpackChunkName: "Auth" */ './feature/user/user.module').then(
            (m) => m.UserModule
          ),
      },
      {
        path: RoutesUtil.Subject.path,
        loadChildren: () =>
          import(/* webpackChunkName: "Auth" */ './feature/subject/subject.module').then(
            (m) => m.SubjectModule
          ),
      },
      {
        path: RoutesUtil.ClassRoom.path,
        loadChildren: () =>
          import(/* webpackChunkName: "Auth" */ './feature/class-room/class-room.module').then(
            (m) => m.CLassRoomModule
          ),
      },
      {
        path: RoutesUtil.Student.path,
        loadChildren: () =>
          import(/* webpackChunkName: "Auth" */ './feature/student/student.module').then(
            (m) => m.StudentModule
          ),
      },
      {
        path: RoutesUtil.School.path,
        loadChildren: () =>
          import(/* webpackChunkName: "Auth" */ './feature/school/school.module').then(
            (m) => m.SchoolModule
          ),
      },
      {
        path: RoutesUtil.Invoice.path,
        loadChildren: () =>
          import(/* webpackChunkName: "Auth" */ './feature/invoice/invoice.module').then(
            (m) => m.InvoiceModule
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
