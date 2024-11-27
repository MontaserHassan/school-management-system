import { Expose } from 'class-transformer';
import { list } from '../../shared/models/list';

export class EventModel {
  @Expose()
  _id!: string;

  @Expose()
  eventId!: string;

  @Expose()
  eventName!: string;

  @Expose()
  date!: string;

  @Expose()
  description!: string;

  @Expose()
  schoolId!: string;

  @Expose()
  userId!: string;

  @Expose()
  username!: string;

  @Expose()
  response!: string;

  @Expose()
  expiryDate!: string;

  @Expose()
  createdAt!: string;

  @Expose()
  updatedAt!: string;

  @Expose()
  eventDetails?: EventDetails;
}

export class EventList extends list {
  @Expose()
  events!: EventModel[];
}

export class UserResponse {
  @Expose()
  userId!: string;

  @Expose()
  username!: string;
}

export class EventDetails {
  @Expose()
  totalAttending!: number;

  @Expose()
  totalRejected!: number;

  @Expose()
  totalNoResponse!: number;

  @Expose()
  attendees!: UserResponse[];

  @Expose()
  rejected!: UserResponse[];

  @Expose()
  notResponse!: UserResponse[];
}

export class EventResponse {
  @Expose()
  eventDetails!: EventDetails;

  @Expose()
  event!: EventModel;
}
