import { Expose } from "class-transformer";
import { list } from "../../shared/models/list";
import { Domain } from "../../student/models/student.model";

export class Skill{
  @Expose()
  _id?: string;

  @Expose()
  skillId?: string;

  @Expose()
  skillName?: string;

  @Expose()
  schoolId?: string;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;

  @Expose()
  domainId?: string

  @Expose()
  domainName?: string
}


export class SkillList extends list{
  @Expose()
  skills?: Skill[];
}
