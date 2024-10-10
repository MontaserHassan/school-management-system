import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesUtil } from '../shared/utils/routes.util';
import { SendEmailComponent } from './pages/send-email/send-email.component';
import { TicketComponent } from './pages/ticket/ticket.component';

const routes: Routes = [
  {
    path: RoutesUtil.SocialEmail.path,
    component: SendEmailComponent,
  },
  {
    path: RoutesUtil.SocialTicket.path,
    component: TicketComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialRoutingModule { }
