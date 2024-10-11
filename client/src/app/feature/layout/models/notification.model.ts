import { Expose } from "class-transformer";
class ticket {
  @Expose()
  isTicket!: boolean;

  @Expose()
  ticketId!: string;
}
export class Notification {
  @Expose()
  _id!: string;
  @Expose()
  userId!: string;
  @Expose()
  schoolId!: string;
  @Expose()
  header!: string;
  @Expose()
  message!: string;
  @Expose()
  read!: boolean;
  @Expose()
  ticket!: ticket;
  @Expose()
  createdAt!: Date;
  @Expose()
  updatedAt!: Date;
}

export class NotificationList {
  @Expose()
  notifications!: Notification[];
}
