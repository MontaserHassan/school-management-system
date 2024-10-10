import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-box',
  templateUrl: './ticket-box.component.html',
  styleUrls: ['./ticket-box.component.scss']
})
export class TicketBoxComponent implements OnInit {
  chatData = {
    userOne: {
      userId: 'kttyDR1Gz3AHotyA8tvtm',
      userName: 'admin admin'
    },
    userTwo: {
      userId: '5CyZbAO0ksY9KdOwlboDH',
      userName: 'super admin'
    },
    messages: [
      {
        sender: {
          senderId: 'kttyDR1Gz3AHotyA8tvtm',
          senderName: 'admin admin'
        },
        receiver: {
          receiverId: '5CyZbAO0ksY9KdOwlboDH',
          receiverName: 'super admin'
        },
        message: 'First Message',
        dateCreation: new Date('2024-10-09T18:28:08.465Z')
      },
      {
        sender: {
          senderId: 'kttyDR1Gz3AHotyA8tvtm',
          senderName: 'admin admin'
        },
        receiver: {
          receiverId: '5CyZbAO0ksY9KdOwlboDH',
          receiverName: 'super admin'
        },
        message: 'Second Message',
        dateCreation: new Date('2024-10-09T18:28:59.385Z')
      },
      {
        sender: {
          senderId:'5CyZbAO0ksY9KdOwlboDH',
          senderName:'super admin',
        },
        receiver: {
          receiverId: 'kttyDR1Gz3AHotyA8tvtm',
          receiverName:'admin admin',
        },
        message: 'Message',
        dateCreation: new Date('2024-10-09T18:28:59.385Z')
      }
    ]
  };
  constructor() { }

  ngOnInit() {
  }

}
