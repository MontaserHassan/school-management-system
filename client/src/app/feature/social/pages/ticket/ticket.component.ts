import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../models/ticket.model';
import { LayoutService } from '../../../shared/services/general/layout.service';
import { ScreenSizes } from '../../../shared/enums/screen-sizes.enum';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { LookupModel } from '../../../shared/models/lookup.model';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  tickets!: Ticket[]
  size!: number;
  sidebarVisible: boolean = false;

  selectedTicket!: Ticket;
  sender!: LookupModel;
  newTicket!: Ticket;
  protected ScreenSizes = ScreenSizes

  constructor(private LayoutService:LayoutService ) {  }

  ngOnInit() {
    this.size = this.LayoutService.currentScreenWidth
    this.LayoutService.currentScreenWidth$.subscribe((size) => {
      this.size = size
    });
  }

  openTicket(ticket: Ticket) {
    this.selectedTicket = {...ticket};

  }
  openNewTicket(sender: LookupModel) {
    this.sender = {...sender};
  }

  onOpenNewTicket($event: Ticket) {
    this.newTicket = $event;
  }
}
