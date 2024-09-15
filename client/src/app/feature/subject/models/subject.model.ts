import { Expose, Type } from 'class-transformer';
import { Model } from '../../shared/models/model';
import { list } from '../../shared/models/list';

export class Subject extends Model{
  @Expose()
  subjectName?: string;

  @Expose()
  courseTime?: string;

  @Expose()
  typeOfTime?: string;

  @Expose()
  _id?: string;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;

  @Expose()
  __v?: number;
}


export class SubjectsList extends list {
  @Expose()
  subject?: Subject[];
}
