import { Expose } from "class-transformer";
import exp from "constants";
import e from "express";
import { list } from "../../shared/models/list";

export class Topic{
  @Expose()
  _id?: string;

  @Expose()
  topicName?: string;

  @Expose()
  schoolId?: string;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;
}


export class TopicList extends list{
  @Expose()
  topics?: Topic[];
}
