import { Expose, Type } from 'class-transformer';
import { Model } from '../../shared/models/model';

export class ISubjectPayload {
  @Expose()
  subjectName?: string;

  @Expose()
  courseTime?: string;
}
