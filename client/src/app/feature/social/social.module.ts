import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SocialRoutingModule } from './social.routes';
import { SendEmailComponent } from './pages/send-email/send-email.component';
import { TicketComponent } from './pages/ticket/ticket.component';
import { TicketsListComponent } from './components/tickets-list/tickets-list.component';
import { TicketBoxComponent } from './components/ticket-box/ticket-box.component';

@NgModule({
  declarations: [
    SendEmailComponent,
    TicketComponent,
    TicketsListComponent,
    TicketBoxComponent
  ],
  imports: [
    CommonModule, SharedModule, SocialRoutingModule,
  ],
})
export class SocialModule { }
