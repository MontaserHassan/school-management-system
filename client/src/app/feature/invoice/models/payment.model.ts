import { Expose } from "class-transformer";

export class Payment {
  @Expose()
  payment!: string;

  @Expose()
  paymentTransaction!: string;

  @Expose()
  redirectURL!: string;
}
