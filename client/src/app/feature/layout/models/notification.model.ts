import { Expose } from "class-transformer";

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
  createdAt!: Date;
  @Expose()
  updatedAt!: Date;
}

export class NotificationList {
  @Expose()
  notifications!: Notification[];
}
