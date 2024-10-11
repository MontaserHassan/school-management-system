import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { Ticket } from '../../models/ticket.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lookup } from '../../../shared/enums/lookup.enum';
import { SocialService } from '../../services/social.service';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { SectionStateStatus } from '../../../shared/enums/section-state-status.enum';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent extends BaseComponent implements OnInit, OnChanges{
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @Input() newTicket!: Ticket;
  @Output() openTicket = new EventEmitter<Ticket>()
  @Output() openNewTicket = new EventEmitter()

  tickets: Ticket[] = []
  receiverForm!: FormGroup
  userId!: string

  protected Lookup = Lookup
  protected sectionStateStatus = SectionStateStatus
  constructor(
    private fb: FormBuilder,
    private socialService: SocialService,
    private auth: AuthService
  ) {
    super();
    this.userId = this.auth.currentUser$.value.user?._id || '';

    this.receiverForm = this.fb.group({
      receiver: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.getTicketsList()
  }

  ngOnChanges() {
    if (this.newTicket) {
      this.tickets=[]
      this.getTicketsList()
    }
  }

  getTimeAgo(date: Date): string {
    const timeDifference = new Date().getTime() - new Date(date).getTime();

    const daysAgo = Math.floor(timeDifference / (1000 * 3600 * 24));
    if (daysAgo > 0) {
      return `${daysAgo}d`;
    }

    const hoursAgo = Math.floor(timeDifference / (1000 * 3600));
    if (hoursAgo > 0) {
      return `${hoursAgo}h`;
    }

    const minutesAgo = Math.floor(timeDifference / (1000 * 60));

    if (minutesAgo > 0) {
      return `${minutesAgo}m`;
    }

    return 'Just now';
  }

  getTicketsList() {
    const params = { page: this.offset, limit: this.pageSize };

    this.load(
      this.socialService.getTickets(params)
    ).subscribe((res) => {
      this.tickets = this.tickets.concat(res.tickets);
      this.pageSize = res?.limit || 0
    })
  }

  onScroll(): void {
    const element = this.scrollContainer.nativeElement;
    const scrollPosition = element.scrollTop + element.offsetHeight;
    const maxScroll = element.scrollHeight;

    if (scrollPosition+1 >= maxScroll) {
      this.offset++;
      this.getTicketsList();
    }
  }

  onClickOpenNewTicket(sender:Lookup){
    this.openNewTicket.emit(sender)
    this.receiverForm.get('receiver')?.setValue('')
  }
}
