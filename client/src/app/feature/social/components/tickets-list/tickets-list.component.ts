import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from '../../models/ticket.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lookup } from '../../../shared/enums/lookup.enum';
import { SocialService } from '../../services/social.service';
import { BaseComponent } from '../../../shared/component/base-component/base.component';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent extends BaseComponent implements OnInit {
  @Input() tickets!:Ticket[]
  receiverForm!:FormGroup

  protected Lookup = Lookup

  constructor(
    private fb: FormBuilder,
    private socialService: SocialService
  ) {
    super();
    this.receiverForm = this.fb.group({
      receiver: [null, Validators.required] // Initialize the receiver control
    });
  }

  ngOnInit() {
    this.getTicketsList()
  }

  getTimeAgo(date: Date): string {
    const timeDifference = new Date().getTime() - new Date(date).getTime();
    const daysAgo = Math.floor(timeDifference / (1000 * 3600 * 24));
    return `${daysAgo}d`;
  }

  getTicketsList(){
    const params = { page: this.offset, limit: this.pageSize};

    this.load(
      this.socialService.getTickets(params),{
        isLoadingTransparent: true,
      }
    ).subscribe((res) => {
      this.tickets = res.tickets;
      this.pageSize = res?.limit || 0
    })
  }
}
