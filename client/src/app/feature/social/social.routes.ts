import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesUtil } from '../shared/utils/routes.util';
import { SendEmailComponent } from './pages/send-email/send-email.component';

const routes: Routes = [
  {
    path: RoutesUtil.SocialEmail.path,
    component: SendEmailComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialRoutingModule { }
