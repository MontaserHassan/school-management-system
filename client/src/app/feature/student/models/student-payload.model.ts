import { Expose } from "class-transformer";

export class IStudentPayload {
  @Expose()
  studentName?: string;

  @Expose()
  classRoom?: string

  @Expose()
  parentId?: number;
}
