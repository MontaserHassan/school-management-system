import { Expose, Type } from 'class-transformer';
import { User } from '../../shared/models/user.model';
import e from 'express';
import { list } from '../../shared/models/list';
import { Cycle } from '../../cycle/models/cycle.model';

export class School {
  @Expose()
  _id?: string;

  @Expose()
  schoolName?: string;

  @Expose()
  admin?: User;

  @Expose()
  employees?: User[];

  @Expose()
  subscriptionFees?: string;

  @Expose()
  subscriptionDate?: Date;

  @Expose()
  endOfSubscription?: Date;

  @Expose()
  currencyOfSubscription?: string;

  @Expose()
  subscriptionWay?: string;

  @Expose()
  subscriptionStatus?: string;

  @Expose()
  notifySuperAdmin?: boolean;

  @Expose()
  verify?: boolean;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;
}

export class SchoolResponse{
  @Expose()
  school?: School;

  @Expose()
  cycles?: Cycle[];
}

export class SchoolList extends list {
  @Expose()
  schools?: School[];
}
