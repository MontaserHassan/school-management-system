import { Expose, Type } from 'class-transformer';
import { list } from '../../shared/models/list';
import { Topic } from '../../class-room/models/topic.model';
import { Degree } from '../enums/degree.enum';

export class Subject {
  @Expose()
  subjectId!: string;

  @Expose()
  subjectName!: string;

  @Expose()
  progressStatus!: string;

  @Expose()
  degree!: Degree;
}


export class Attendance {
  @Expose()
  status!: string;

  @Expose()
  comment!: string;

  @Expose()
  date!: string;
}

export class Comment {
  @Expose()
  comment!: string;

  @Expose()
  media!: string; // Base64 string

  @Expose()
  dateOfComment!: string;
}

export class progressHistory {
  @Expose()
  _id!: string
  @Expose()
  studentId!: string
  @Expose()
  subjectId!: string
  @Expose()
  subjectName!: "math"
  @Expose()
  topics!: Topic[]

  @Expose()
  completed!: boolean
  @Expose()
  status!:string
  @Expose()
  createdAt!: Date
  @Expose()
  updatedAt!: Date
  @Expose()
  __v!: number
}

export class Student {
  @Expose()
  _id!: string;

  @Expose()
  studentName!: string;

  @Expose()
  studentCode!: string;

  @Expose()
  classRoom!: string;

  @Expose()
  group!: string;

  @Expose()
  subjects!: Subject[];

  @Expose()
  mainTopics!: Topic[];

  @Expose()
  degree!: Degree;

  @Expose()
  studentCost!: string;

  @Expose()
  currencyOfCost!: string;

  @Expose()
  attendance!: Attendance[];

  @Expose()
  comments!: Comment[];

  @Expose()
  createdAt!: string;

  @Expose()
  updatedAt!: string;

  @Expose()
  schoolId!: string;

  @Expose()
  progressHistory!: progressHistory[];
}


export class StudentList extends list {
  @Expose()
  students?: Student[];
}

