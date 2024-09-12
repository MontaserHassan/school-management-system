import { Expose, Transform } from "class-transformer";
import { Model } from "./model";
import { UserRole } from "../enums/user-role.enum";

export class User {
  @Expose() _id?: string;
  @Expose() userName?: string;
  @Expose() email?: string;
  @Expose() role?: string;
  @Expose() code?: string;
  @Expose() updatePassword?: boolean;
  @Expose()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  createdAt?: Date;
  @Expose()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  updatedAt?: Date;
  @Expose()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  lastSeen?: Date;
  @Expose() logged?: boolean;
}

export class AuthResponse extends Model {
  @Expose() user?: User;
  @Expose() token?: string;
}
