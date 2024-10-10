import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  tickets: Ticket[] = [new Ticket()];

  constructor() {  }

  ngOnInit() {
  }



}
