import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Ticket } from '../../models/ticket.model';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { SocialService } from '../../services/social.service';
import { LookupModel } from '../../../shared/models/lookup.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ticket-box',
  templateUrl: './ticket-box.component.html',
  styleUrls: ['./ticket-box.component.scss']
})
export class TicketBoxComponent extends BaseComponent implements OnInit, OnChanges {
  @ViewChild('messageList') messageList!: ElementRef;
  chatData!: Ticket;
  userId!: string;
  newMessage: string = '';
  selectedTicketId!: string;
  GetMessages: boolean = true;
  @Output() onOpenNewTicket = new EventEmitter();
  @Input() sender!: LookupModel;

  constructor(
    private auth: AuthService,
    private socialService: SocialService,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) {
    super();
    this.userId = this.auth.currentUser$.value.user?._id || '';
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      this.selectedTicketId = params?.['id']
      if (this.selectedTicketId && this.GetMessages) {
        this.getTicketById(this.selectedTicketId);
      }

      if (!this.GetMessages) {
        this.GetMessages = true
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['sender'] && changes['sender'].currentValue) {
      this.chatData = {
        _id: '',
        messages: [],
        expirationDate: new Date(),
        schoolId: '',
        userOne: {
          userId: this.userId,
          userName: this.auth.currentUser$.value.user?.userName || ''
        },
        userTwo: {
          userId: this.sender?.value || '',
          userName: this.sender?.label || ''
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        opened: true,
        read: {
          isRead: true,
          userId: this.userId
        }
      }
    }
  }

  scrollToBottom(): void {
    setTimeout(() => {
      const messageBox = this.messageList?.nativeElement;
      if (messageBox) {
        messageBox!.scrollTop = messageBox?.scrollHeight;
      }
    });
  }

  onEnter(event: any) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  sendMessage() {
    if (!this.selectedTicketId && !this.chatData._id) {
      this.openNewTicket();
      return;
    }

    if (this.newMessage.trim()) {
      const body = {
        message: this.newMessage.trim(),
        ticketId: this.chatData._id || ""
      }
      this.load(
        this.socialService.sendMessage(body)
      ).subscribe((res) => {
        this.newMessage = '';
        this.chatData = res
        this.scrollToBottom();
        this.onOpenNewTicket.emit(res)
      })
    }
  }

  setParams(params?: {}): void {
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: params,
    });
  }

  openNewTicket() {
    this.load(
      this.socialService.addTicket({ receiver: this.sender?.value || '' })
    ).subscribe((res) => {
      this.GetMessages = false;
      this.setParams({ id: res._id })

      this.chatData = res;
      if (this.newMessage.trim()) {
        this.sendMessage();
      }
    })
  }

  getTicketById(id: string) {
    this.load(
      this.socialService.getTicketById(id)
    ).subscribe((res) => {
      this.chatData = res;
      this.scrollToBottom();
    })
  }
}
