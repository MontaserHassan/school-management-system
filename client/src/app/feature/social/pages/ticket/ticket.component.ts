import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  tickets: Ticket[] = [new Ticket()];
  currentPage = 1;
  limit = 10;
  totalDocuments = 0;
  loading = false;

  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  onScrollDown(ev:any) {
    console.log("scrolled down!!", ev);
  }

  constructor() {
    this.getMockTickets();
  }

  ngOnInit() {
  }

  onScroll(event: any) {
    console.log(event);
  // Check if the user has scrolled to the end of the items
  if (event.first + event.rows >= this.tickets.length && !this.loading) {
    // this.fetchMoreTickets();

  }
  }

  getMockTickets() {
    this.tickets = [
      {
        "userOne": {
          "userId": "kttyDR1Gz3AHotyA8tvtm",
          "userName": "admin admin"
        },
        "userTwo": {
          "userId": "5CyZbAO0ksY9KdOwlboDH",
          "userName": "super admin"
        },
        "_id": "fx9unGP2KrCaS46URVSdV4od",
        "schoolId": "HQiPO_ovyNWpxm8lSHZPxUU8",
        "read": false,
        "opened": true,
        "messages": [
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation": new Date("2024-10-09T18:28:08.465Z")
          },
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation":  new Date("2024-10-09T18:28:59.385Z")
          },],
        "expirationDate":  new Date("2025-07-09T17:40:14.362Z"),
        "createdAt":  new Date("2024-10-09T17:40:14.364Z"),
        "updatedAt":  new Date("2024-10-09T17:40:14.364Z")
      },

      {
        "userOne": {
          "userId": "kttyDR1Gz3AHotyA8tvtm",
          "userName": "admin admin"
        },
        "userTwo": {
          "userId": "5CyZbAO0ksY9KdOwlboDH",
          "userName": "super admin"
        },
        "_id": "fx9unGP2KrCaS46URVSdV4od",
        "schoolId": "HQiPO_ovyNWpxm8lSHZPxUU8",
        "read": false,
        "opened": true,
        "messages": [
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation": new Date("2024-10-09T18:28:08.465Z")
          },
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation":  new Date("2024-10-09T18:28:59.385Z")
          },],
        "expirationDate":  new Date("2025-07-09T17:40:14.362Z"),
        "createdAt":  new Date("2024-10-09T17:40:14.364Z"),
        "updatedAt":  new Date("2024-10-09T17:40:14.364Z")
      },

      {
        "userOne": {
          "userId": "kttyDR1Gz3AHotyA8tvtm",
          "userName": "admin admin"
        },
        "userTwo": {
          "userId": "5CyZbAO0ksY9KdOwlboDH",
          "userName": "super admin"
        },
        "_id": "fx9unGP2KrCaS46URVSdV4od",
        "schoolId": "HQiPO_ovyNWpxm8lSHZPxUU8",
        "read": false,
        "opened": true,
        "messages": [
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation": new Date("2024-10-09T18:28:08.465Z")
          },
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation":  new Date("2024-10-09T18:28:59.385Z")
          },],
        "expirationDate":  new Date("2025-07-09T17:40:14.362Z"),
        "createdAt":  new Date("2024-10-09T17:40:14.364Z"),
        "updatedAt":  new Date("2024-10-09T17:40:14.364Z")
      },
      {
        "userOne": {
          "userId": "kttyDR1Gz3AHotyA8tvtm",
          "userName": "admin admin"
        },
        "userTwo": {
          "userId": "5CyZbAO0ksY9KdOwlboDH",
          "userName": "super admin"
        },
        "_id": "fx9unGP2KrCaS46URVSdV4od",
        "schoolId": "HQiPO_ovyNWpxm8lSHZPxUU8",
        "read": false,
        "opened": true,
        "messages": [
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation": new Date("2024-10-09T18:28:08.465Z")
          },
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation":  new Date("2024-10-09T18:28:59.385Z")
          },],
        "expirationDate":  new Date("2025-07-09T17:40:14.362Z"),
        "createdAt":  new Date("2024-10-09T17:40:14.364Z"),
        "updatedAt":  new Date("2024-10-09T17:40:14.364Z")
      },
      {
        "userOne": {
          "userId": "kttyDR1Gz3AHotyA8tvtm",
          "userName": "admin admin"
        },
        "userTwo": {
          "userId": "5CyZbAO0ksY9KdOwlboDH",
          "userName": "super admin"
        },
        "_id": "fx9unGP2KrCaS46URVSdV4od",
        "schoolId": "HQiPO_ovyNWpxm8lSHZPxUU8",
        "read": false,
        "opened": true,
        "messages": [
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation": new Date("2024-10-09T18:28:08.465Z")
          },
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation":  new Date("2024-10-09T18:28:59.385Z")
          },],
        "expirationDate":  new Date("2025-07-09T17:40:14.362Z"),
        "createdAt":  new Date("2024-10-09T17:40:14.364Z"),
        "updatedAt":  new Date("2024-10-09T17:40:14.364Z")
      },
      {
        "userOne": {
          "userId": "kttyDR1Gz3AHotyA8tvtm",
          "userName": "admin admin"
        },
        "userTwo": {
          "userId": "5CyZbAO0ksY9KdOwlboDH",
          "userName": "super admin"
        },
        "_id": "fx9unGP2KrCaS46URVSdV4od",
        "schoolId": "HQiPO_ovyNWpxm8lSHZPxUU8",
        "read": false,
        "opened": true,
        "messages": [
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation": new Date("2024-10-09T18:28:08.465Z")
          },
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation":  new Date("2024-10-09T18:28:59.385Z")
          },],
        "expirationDate":  new Date("2025-07-09T17:40:14.362Z"),
        "createdAt":  new Date("2024-10-09T17:40:14.364Z"),
        "updatedAt":  new Date("2024-10-09T17:40:14.364Z")
      },
      {
        "userOne": {
          "userId": "kttyDR1Gz3AHotyA8tvtm",
          "userName": "admin admin"
        },
        "userTwo": {
          "userId": "5CyZbAO0ksY9KdOwlboDH",
          "userName": "super admin"
        },
        "_id": "fx9unGP2KrCaS46URVSdV4od",
        "schoolId": "HQiPO_ovyNWpxm8lSHZPxUU8",
        "read": false,
        "opened": true,
        "messages": [
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation": new Date("2024-10-09T18:28:08.465Z")
          },
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation":  new Date("2024-10-09T18:28:59.385Z")
          },],
        "expirationDate":  new Date("2025-07-09T17:40:14.362Z"),
        "createdAt":  new Date("2024-10-09T17:40:14.364Z"),
        "updatedAt":  new Date("2024-10-09T17:40:14.364Z")
      },
      {
        "userOne": {
          "userId": "kttyDR1Gz3AHotyA8tvtm",
          "userName": "admin admin"
        },
        "userTwo": {
          "userId": "5CyZbAO0ksY9KdOwlboDH",
          "userName": "super admin"
        },
        "_id": "fx9unGP2KrCaS46URVSdV4od",
        "schoolId": "HQiPO_ovyNWpxm8lSHZPxUU8",
        "read": false,
        "opened": true,
        "messages": [
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation": new Date("2024-10-09T18:28:08.465Z")
          },
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation":  new Date("2024-10-09T18:28:59.385Z")
          },],
        "expirationDate":  new Date("2025-07-09T17:40:14.362Z"),
        "createdAt":  new Date("2024-10-09T17:40:14.364Z"),
        "updatedAt":  new Date("2024-10-09T17:40:14.364Z")
      },
      {
        "userOne": {
          "userId": "kttyDR1Gz3AHotyA8tvtm",
          "userName": "admin admin"
        },
        "userTwo": {
          "userId": "5CyZbAO0ksY9KdOwlboDH",
          "userName": "super admin"
        },
        "_id": "fx9unGP2KrCaS46URVSdV4od",
        "schoolId": "HQiPO_ovyNWpxm8lSHZPxUU8",
        "read": false,
        "opened": true,
        "messages": [
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation": new Date("2024-10-09T18:28:08.465Z")
          },
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation":  new Date("2024-10-09T18:28:59.385Z")
          },],
        "expirationDate":  new Date("2025-07-09T17:40:14.362Z"),
        "createdAt":  new Date("2024-10-09T17:40:14.364Z"),
        "updatedAt":  new Date("2024-10-09T17:40:14.364Z")
      },
      {
        "userOne": {
          "userId": "kttyDR1Gz3AHotyA8tvtm",
          "userName": "admin admin"
        },
        "userTwo": {
          "userId": "5CyZbAO0ksY9KdOwlboDH",
          "userName": "super admin"
        },
        "_id": "fx9unGP2KrCaS46URVSdV4od",
        "schoolId": "HQiPO_ovyNWpxm8lSHZPxUU8",
        "read": false,
        "opened": true,
        "messages": [
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation": new Date("2024-10-09T18:28:08.465Z")
          },
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation":  new Date("2024-10-09T18:28:59.385Z")
          },],
        "expirationDate":  new Date("2025-07-09T17:40:14.362Z"),
        "createdAt":  new Date("2024-10-09T17:40:14.364Z"),
        "updatedAt":  new Date("2024-10-09T17:40:14.364Z")
      },
      {
        "userOne": {
          "userId": "kttyDR1Gz3AHotyA8tvtm",
          "userName": "admin admin"
        },
        "userTwo": {
          "userId": "5CyZbAO0ksY9KdOwlboDH",
          "userName": "super admin"
        },
        "_id": "fx9unGP2KrCaS46URVSdV4od",
        "schoolId": "HQiPO_ovyNWpxm8lSHZPxUU8",
        "read": false,
        "opened": true,
        "messages": [
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation": new Date("2024-10-09T18:28:08.465Z")
          },
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation":  new Date("2024-10-09T18:28:59.385Z")
          },],
        "expirationDate":  new Date("2025-07-09T17:40:14.362Z"),
        "createdAt":  new Date("2024-10-09T17:40:14.364Z"),
        "updatedAt":  new Date("2024-10-09T17:40:14.364Z")
      },
      {
        "userOne": {
          "userId": "kttyDR1Gz3AHotyA8tvtm",
          "userName": "admin admin"
        },
        "userTwo": {
          "userId": "5CyZbAO0ksY9KdOwlboDH",
          "userName": "super admin"
        },
        "_id": "fx9unGP2KrCaS46URVSdV4od",
        "schoolId": "HQiPO_ovyNWpxm8lSHZPxUU8",
        "read": false,
        "opened": true,
        "messages": [
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation": new Date("2024-10-09T18:28:08.465Z")
          },
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation":  new Date("2024-10-09T18:28:59.385Z")
          },],
        "expirationDate":  new Date("2025-07-09T17:40:14.362Z"),
        "createdAt":  new Date("2024-10-09T17:40:14.364Z"),
        "updatedAt":  new Date("2024-10-09T17:40:14.364Z")
      },
      {
        "userOne": {
          "userId": "kttyDR1Gz3AHotyA8tvtm",
          "userName": "admin admin"
        },
        "userTwo": {
          "userId": "5CyZbAO0ksY9KdOwlboDH",
          "userName": "super admin"
        },
        "_id": "fx9unGP2KrCaS46URVSdV4od",
        "schoolId": "HQiPO_ovyNWpxm8lSHZPxUU8",
        "read": false,
        "opened": true,
        "messages": [
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation": new Date("2024-10-09T18:28:08.465Z")
          },
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation":  new Date("2024-10-09T18:28:59.385Z")
          },],
        "expirationDate":  new Date("2025-07-09T17:40:14.362Z"),
        "createdAt":  new Date("2024-10-09T17:40:14.364Z"),
        "updatedAt":  new Date("2024-10-09T17:40:14.364Z")
      },
      {
        "userOne": {
          "userId": "kttyDR1Gz3AHotyA8tvtm",
          "userName": "admin admin"
        },
        "userTwo": {
          "userId": "5CyZbAO0ksY9KdOwlboDH",
          "userName": "super admin"
        },
        "_id": "fx9unGP2KrCaS46URVSdV4od",
        "schoolId": "HQiPO_ovyNWpxm8lSHZPxUU8",
        "read": false,
        "opened": true,
        "messages": [
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation": new Date("2024-10-09T18:28:08.465Z")
          },
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation":  new Date("2024-10-09T18:28:59.385Z")
          },],
        "expirationDate":  new Date("2025-07-09T17:40:14.362Z"),
        "createdAt":  new Date("2024-10-09T17:40:14.364Z"),
        "updatedAt":  new Date("2024-10-09T17:40:14.364Z")
      },
      {
        "userOne": {
          "userId": "kttyDR1Gz3AHotyA8tvtm",
          "userName": "admin admin"
        },
        "userTwo": {
          "userId": "5CyZbAO0ksY9KdOwlboDH",
          "userName": "super admin"
        },
        "_id": "fx9unGP2KrCaS46URVSdV4od",
        "schoolId": "HQiPO_ovyNWpxm8lSHZPxUU8",
        "read": false,
        "opened": true,
        "messages": [
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation": new Date("2024-10-09T18:28:08.465Z")
          },
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation":  new Date("2024-10-09T18:28:59.385Z")
          },],
        "expirationDate":  new Date("2025-07-09T17:40:14.362Z"),
        "createdAt":  new Date("2024-10-09T17:40:14.364Z"),
        "updatedAt":  new Date("2024-10-09T17:40:14.364Z")
      },
      {
        "userOne": {
          "userId": "kttyDR1Gz3AHotyA8tvtm",
          "userName": "admin admin"
        },
        "userTwo": {
          "userId": "5CyZbAO0ksY9KdOwlboDH",
          "userName": "super admin"
        },
        "_id": "fx9unGP2KrCaS46URVSdV4od",
        "schoolId": "HQiPO_ovyNWpxm8lSHZPxUU8",
        "read": false,
        "opened": true,
        "messages": [
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation": new Date("2024-10-09T18:28:08.465Z")
          },
          {
            "sender": {
              "senderId": "kttyDR1Gz3AHotyA8tvtm",
              "senderName": "admin admin"
            },
            "receiver": {
              "receiverId": "5CyZbAO0ksY9KdOwlboDH",
              "receiverName": "super admin"
            },
            "message": "First Message",
            "dateCreation":  new Date("2024-10-09T18:28:59.385Z")
          },],
        "expirationDate":  new Date("2025-07-09T17:40:14.362Z"),
        "createdAt":  new Date("2024-10-09T17:40:14.364Z"),
        "updatedAt":  new Date("2024-10-09T17:40:14.364Z")
      },

    ]
  }

  getTimeAgo(date: Date): string {
    const timeDifference = new Date().getTime() - new Date(date).getTime();
    const daysAgo = Math.floor(timeDifference / (1000 * 3600 * 24));
    return `${daysAgo}d`;
  }
}
