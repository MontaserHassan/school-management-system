
import { Expose, Type } from 'class-transformer';

class Subject {
  @Expose()
  subjectId?: string;

  @Expose()
  startTime?: string;
}

class Schedule {
  @Expose()
  day?: string;

  @Expose()
  @Type(() => Subject)
  subjects?: Subject[];
}

export class IClassDetailsPayload {
  @Expose()
  room?: string;

  @Expose()
  roomId?: string;

  @Expose()
  teachersId?: string[];

  @Expose()
  @Type(() => Schedule)
  schedule?: Schedule[];

  @Expose()
  mainTopics?: string[];

  @Expose()
  studentCost?: string;

  @Expose()
  currencyOfCost?: string;

  @Expose()
  group?: string;
}
