import { Expose } from 'class-transformer';

export class Lookup  {
  @Expose() _id!: number;
  @Expose() value!: string;
}
