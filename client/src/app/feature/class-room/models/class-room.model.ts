import { Expose, Type } from 'class-transformer';
import { list } from '../../shared/models/list';
import { Topic } from './topic.model';
import { Student } from '../../student/models/student.model';

class Domain {
  @Expose()
  domainId?: string;

  @Expose()
  domainName?: string;

  @Expose()
  startTime?: string;

  @Expose()
  endTime?: string;
}

class Schedule {
  @Expose()
  day?: string;

  @Expose()
  domains?: Domain[];
}

class Teacher {
  @Expose()
  teacherId?: string;

  @Expose()
  teacherName?: string;
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
  mainTopics?: Topic[];

  @Expose()
  schedule?: Schedule[];

  @Expose()
  studentCost?: string;

  @Expose()
  currencyOfCost?: string;

  @Expose()
  students?: Student[];

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;
}

export class ClassRoomResponse extends list{
  @Expose()
  rooms?: ClassRoom[];
}
