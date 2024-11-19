
import { Expose, Type } from 'class-transformer';

class Domain {
  @Expose()
  domainId?: string;

  @Expose()
  startTime?: string;
}

class Schedule {
  @Expose()
  day?: string;

  @Expose()
  @Type(() => Domain)
  domains?: Domain[];
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
  mainSkills?: string[];

  @Expose()
  studentCost?: string;

  @Expose()
  currencyOfCost?: string;

  @Expose()
  group?: string;
}
