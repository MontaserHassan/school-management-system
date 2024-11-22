import { Expose, Type } from 'class-transformer';
import { Model } from '../../shared/models/model';

export class IDomainPayload {
  @Expose()
  domainName?: string;

  @Expose()
  courseTime?: string;

  @Expose()
  groupId?: string;
}
