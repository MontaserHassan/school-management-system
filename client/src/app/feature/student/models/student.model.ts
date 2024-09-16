import { Expose, Type } from 'class-transformer';
import { list } from '../../shared/models/list';

class Subject {
  @Expose()
  subjectId?: string;

  @Expose()
  subjectName?: string;
}

class MainTopic {
  @Expose()
  topicId?: string;

  @Expose()
  topicName?: string;
}

export class Student {
  @Expose()
  _id?: string;

  @Expose()
  schoolId?: string;

  @Expose()
  studentName?: string;

  @Expose()
  studentCode?: string;

  @Expose()
  classRoom?: string;

  @Expose()
  parentId?: string;

  @Expose()
  group?: string;

  @Expose()
  subjects?: Subject[];

  @Expose()
  mainTopics?: MainTopic[];

  @Expose()
  studentCost?: string;

  @Expose()
  currencyOfCost?: string;

  @Expose()
  attendance?: any[];

  @Expose()
  comments?: any[];

  @Expose()
  progressHistory?: any[];

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;

  @Expose()
  __v?: number;
}

export class StudentList extends list {
  @Expose()
  students?: Student[];
}
