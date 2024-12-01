import { Expose } from "class-transformer";
import { list } from "../../shared/models/list";

class Parent {
  @Expose()
  parentId!: string;
  @Expose()
  parentName!: string;
}

class Student {
  @Expose()
  studentId!: string;
  @Expose()
  studentName!: string;
}
export class StudentInvoice{
  @Expose()
  _id!: string;
  @Expose()
  parent!: Parent;
  @Expose()
  amount!: string;
  @Expose()
  student!: Student;
  @Expose()
  invoiceStatus!: 'paid' | 'pending';
  @Expose()
  schoolId!: string;
  @Expose()
  media!: string;
  @Expose()
  createdAt!: Date;
  @Expose()
  updatedAt!: Date;
}

export class StudentInvoiceList extends list{
  @Expose()
  invoices!: StudentInvoice[];
}
