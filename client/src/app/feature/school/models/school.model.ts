import { Expose, Type } from 'class-transformer';
import { User } from '../../shared/models/user.model';
import e from 'express';
import { list } from '../../shared/models/list';

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
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;
}

export class SchoolList extends list {
  @Expose()
  schools?: School[];
}
