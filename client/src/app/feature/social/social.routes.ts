import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesUtil } from '../shared/utils/routes.util';
import { SendEmailComponent } from './pages/send-email/send-email.component';
import { TicketComponent } from './pages/ticket/ticket.component';
import { EventsComponent } from './pages/events/events.component';

const routes: Routes = [
  {
    path: RoutesUtil.SocialEmail.path,
    component: SendEmailComponent,
  },
  {
    path: RoutesUtil.SocialTicket.path,
    component: TicketComponent,
  },
  {
    path: RoutesUtil.SocialEvents.path,
    component: EventsComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialRoutingModule { }
