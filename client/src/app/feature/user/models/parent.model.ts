import { Expose } from "class-transformer";
import { User } from "../../shared/models/user.model";
import { Student } from "../../student/models/student.model";

export class ParentResponse {
  @Expose() user?: User;
  @Expose() students?: Student[];
}
