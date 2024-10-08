import { Expose } from "class-transformer";
import { list } from "../../shared/models/list";

class Admin {
  adminId!: string;
  adminName!: string;
}

class School {
  schoolId!: string;
  schoolName!: string;
}

export class Invoice {
  @Expose()
  admin!: Admin;
  @Expose()
  _id!: string;
  @Expose()
  school!: School;
  @Expose()
  media!: string;
  @Expose()
  createdAt!: Date;
  @Expose()
  updatedAt!: Date;
}

export class InvoiceList extends list{
  @Expose()
  invoices!: Invoice[];
}
