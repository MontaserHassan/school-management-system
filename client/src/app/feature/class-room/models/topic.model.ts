import { Expose } from "class-transformer";
import exp from "constants";
import e from "express";
import { list } from "../../shared/models/list";
import { Subject } from "../../student/models/student.model";

export class Topic{
  @Expose()
  _id?: string;

  @Expose()
  topicId?: string;

  @Expose()
  topicName?: string;

  @Expose()
  schoolId?: string;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;

  @Expose()
  classRoom?: string;

  @Expose()
  subject?: Subject
}


export class TopicList extends list{
  @Expose()
  topics?: Topic[];
}
