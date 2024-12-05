import { Expose } from "class-transformer";
import { list } from "../../shared/models/list";
import { Domain } from "../../student/models/student.model";

class domain{
  @Expose()
  domainId!: string;

  @Expose()
  domainName!: string;

  @Expose()
  isChanged!: boolean;
}


export class EducationDomain {
  @Expose()
  _id!: string;

  @Expose()
  educationDomainName!: string;

  @Expose()
  cycleId!: string;

  @Expose()
  cycleName!: string;

  @Expose()
  educationDomainDescription!: string;

  @Expose()
  domains!: domain[];

  @Expose()
  schoolId!: string;

  @Expose()
  isChanged!: boolean;

  @Expose()
  createdAt!: string;

  @Expose()
  updatedAt!: string;
}


export class Cycle {
  @Expose()
  _id!: string;

  @Expose()
  educationDomains!: EducationDomain[];

  @Expose()
  ageGroup!: string;

  @Expose()
  cycleName!: string;

  @Expose()
  schoolId!: string;

  @Expose()
  createdAt!: string;

  @Expose()
  updatedAt!: string;
}
