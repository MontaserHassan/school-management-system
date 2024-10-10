import { Expose, Type } from 'class-transformer';
import { list } from '../../shared/models/list';

class User {
  @Expose()
  userId!: string;

  @Expose()
  userName!: string;
}

class Sender {
  @Expose()
  senderId!: string;

  @Expose()
  senderName!: string;
}

class Receiver {
  @Expose()
  receiverId!: string;

  @Expose()
  receiverName!: string;
}

class Message {
  @Expose()
  sender!: Sender;

  @Expose()
  receiver!: Receiver;

  @Expose()
  message!: string;

  @Expose()
  dateCreation!: Date;
}

export class Ticket {
  @Expose()
  userOne!: User;

  @Expose()
  userTwo!: User;

  @Expose()
  _id!: string;

  @Expose()
  schoolId!: string;

  @Expose()
  read!: boolean;

  @Expose()
  opened!: boolean;

  @Expose()
  messages!: Message[];

  @Expose()
  expirationDate!: Date;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;
}

export class ticketList extends list {
  @Expose()
  tickets!: Ticket[];
}
