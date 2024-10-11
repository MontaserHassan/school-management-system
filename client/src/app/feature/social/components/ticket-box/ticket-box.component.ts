import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Ticket } from '../../models/ticket.model';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { SocialService } from '../../services/social.service';
import { Lookup } from '../../../shared/models/lookup.model';

@Component({
  selector: 'app-ticket-box',
  templateUrl: './ticket-box.component.html',
  styleUrls: ['./ticket-box.component.scss']
})
export class TicketBoxComponent extends BaseComponent implements OnChanges {
  @ViewChild('messageList') messageList!: ElementRef;
  chatData!:Ticket;
  userId!: string;
  newMessage: string = '';
  @Input() selectedTicket!: Ticket;
  @Output() onOpenNewTicket = new EventEmitter();
  @Input() sender!: Lookup;

  constructor(
    private auth:AuthService,
    private socialService:SocialService
  ) {
    super();
    this.userId = this.auth.currentUser$.value.user?._id || '';
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes?.['selectedTicket'] && changes['selectedTicket'].currentValue) {
      this.getTicketById(this.selectedTicket._id || "");
    }

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
        read: false
      }
    }

  }

  scrollToBottom(): void {
    const messageBox = this.messageList?.nativeElement;
    if(messageBox){
      setTimeout(() => {
        messageBox!.scrollTop = messageBox?.scrollHeight;
      });
    }
  }

  onEnter(event: any) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  sendMessage() {
    if (!this.selectedTicket && !this.chatData?._id ) {
      this.openNewTicket();
      return;
    }

    if (this.newMessage.trim()) {
      const body ={
        message:this.newMessage.trim(),
        ticketId:this.selectedTicket?._id||""
      }
      this.load(
        this.socialService.sendMessage(body)
      ).subscribe((res) => {
        this.newMessage = '';
        this.chatData = res
        this.scrollToBottom();
      })
    }
  }

  openNewTicket() {
    this.load(
      this.socialService.addTicket({receiver: this.sender?.value || ''})
    ).subscribe((res) => {
      this.selectedTicket = res;
      this.chatData = res;
      this.onOpenNewTicket.emit(res)
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
      this.onOpenNewTicket.emit(res)
      this.scrollToBottom();
    })
  }
}
