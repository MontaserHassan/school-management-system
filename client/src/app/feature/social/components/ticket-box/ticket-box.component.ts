import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-box',
  templateUrl: './ticket-box.component.html',
  styleUrls: ['./ticket-box.component.scss']
})
export class TicketBoxComponent implements OnInit {
  @ViewChild('messageList') messageList!: ElementRef;
  chatData!:Ticket;
  userId!: string;
  newMessage: string = '';

  constructor(
    private auth:AuthService
  ) {
    this.userId = this.auth.currentUser$.value.user?._id || '';
  }

  ngOnInit(): void {

  }

  scrollToBottom(): void {
    const messageBox = this.messageList.nativeElement;
    setTimeout(() => {
      messageBox.scrollTop = messageBox.scrollHeight;
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const newMsg = {
        sender: {
          senderId: this.chatData.userOne.userId,
          senderName: this.chatData.userOne.userName
        },
        receiver: {
          receiverId: this.chatData.userTwo.userId,
          receiverName: this.chatData.userTwo.userName
        },
        message: this.newMessage,
        dateCreation: new Date()
      };

      this.chatData.messages.push(newMsg);
      this.newMessage = '';

      this.scrollToBottom();
    }
  }

  onEnter(event: any) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}
