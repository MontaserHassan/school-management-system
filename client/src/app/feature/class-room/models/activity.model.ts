import { Expose } from "class-transformer";
import { list } from "../../shared/models/list";
import { Domain } from "../../student/models/student.model";

export class Activity {
  @Expose()
  _id!: string;

  @Expose()
  activityId!: string;

  @Expose()
  activityName!: string;

  @Expose()
  materials!: string[];

  @Expose()
  skillId!: string;

  @Expose()
  skillName!: string;

  @Expose()
  domainId!: string;

  @Expose()
  domainName!: string;

  @Expose()
  schoolId!: string;

  @Expose()
  createdAt!: string;

  @Expose()
  updatedAt!: string;
}

export class ActivityList extends list{
  @Expose()
  activities?: Activity[];
}
