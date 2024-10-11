import { Expose } from 'class-transformer';

export class Lookup  {
  @Expose() label!: string;
  @Expose() value!: string;
}
