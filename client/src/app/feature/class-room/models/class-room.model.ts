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

export class ClassRoom {
  @Expose()
  room?: string;

  @Expose()
  group?: string;

  @Expose()
  teachers?: Teacher[];

  @Expose()
  mainTopics?: string[];

  @Expose()
  schedule?: Schedule[];

  @Expose()
  studentCost?: string;

  @Expose()
  currencyOfCost?: string;

  @Expose()
  _id?: string;

  @Expose()
  students?: any[];

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;

  @Expose()
  __v?: number;
}


export class ClassRoomResponse extends list{
  @Expose()
  subjectRooms?: ClassRoom[];
}
