import { Expose, Type } from 'class-transformer';
import { Model } from '../../shared/models/model';
import { list } from '../../shared/models/list';
import { Skill } from '../../class-room/models/skill.model';
import { ClassRoom } from '../../class-room/models/class-room.model';

export class Group extends Model{
  @Expose()
  groupName?: string;

  @Expose()
  _id?: string;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;

  @Expose()
  classes?: ClassRoom[];
}


export class GroupList extends list {
  @Expose()
  groups?: Group[];
}
