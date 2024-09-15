import { Expose, Type } from 'class-transformer';
import { list } from '../../shared/models/list';

class Subject {
  @Expose()
  subjectId?: string;

  @Expose()
  subjectName?: string;

  @Expose()
  startTime?: string;

  @Expose()
  endTime?: string;
}

class Schedule {
  @Expose()
  day?: string;

  @Expose()
  subjects?: Subject[];
}

class Teacher {
  @Expose()
  teacherId?: string;

  @Expose()
  teacherName?: string;
}

class MainTopic {
  @Expose()
  topicId?: string;

  @Expose()
  topicName?: string;
}

export class ClassRoom {
  @Expose()
  _id?: string;

  @Expose()
  schoolId?: string;

  @Expose()
  room?: string;

  @Expose()
  group?: string;

  @Expose()
  teachers?: Teacher[];

  @Expose()
  mainTopics?: MainTopic[];

  @Expose()
  schedule?: Schedule[];

  @Expose()
  studentCost?: string;

  @Expose()
  currencyOfCost?: string;

  @Expose()
  students?: any[];

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;
}

export class ClassRoomResponse extends list{
  @Expose()
  subjectRooms?: ClassRoom[];
}
