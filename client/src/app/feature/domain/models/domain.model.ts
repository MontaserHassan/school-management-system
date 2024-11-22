import { Expose, Type } from 'class-transformer';
import { Model } from '../../shared/models/model';
import { list } from '../../shared/models/list';
import { Skill } from '../../class-room/models/skill.model';

export class Domain extends Model{
  @Expose()
  domainName?: string;

  @Expose()
  domainId?: string;

  @Expose()
  courseTime?: string;

  @Expose()
  groupId?: string;

  @Expose()
  typeOfTime?: string;

  @Expose()
  _id?: string;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;

  @Expose()
  skills?: Skill[]

  @Expose()
  __v?: number;
}


export class DomainsList extends list {
  @Expose()
  domain?: Domain[];
}
