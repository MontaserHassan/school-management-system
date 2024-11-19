import { Expose } from "class-transformer";
import exp from "constants";
import e from "express";
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
  classRoom?: string;

  @Expose()
  domain?: Domain
}


export class SkillList extends list{
  @Expose()
  skills?: Skill[];
}
