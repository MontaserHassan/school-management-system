import { Injectable } from '@angular/core';
import { Mapper } from '../../shared/mapper/base-mapper.mapper';
import { ApiBaseService } from '../../shared/services/general/api-base.service';
import { map, Observable } from 'rxjs';
import { ApiConstant } from '../../shared/config/api.constant';
import { Invoice, InvoiceList } from '../models/invoice.model';
import { StudentInvoice, StudentInvoiceList } from '../models/student-invoice.model';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(
    private baseAPI: ApiBaseService,
    private mapper: Mapper
  ) { }

  getSchoolInvoices(params:{}): Observable<InvoiceList> {
    return this.baseAPI.get(ApiConstant.GET_ALL_SCHOOL_INVOICES,{params}).pipe(
      map((res) => this.mapper.fromJson(InvoiceList, res.data))
    )
  }

  addSchoolInvoice(body:{
    schoolId:string,
    media:string
    amount:string
  }): Observable<Invoice> {
    return this.baseAPI.post(ApiConstant.ADD_SCHOOL_INVOICE, body).pipe(
      map((res) => this.mapper.fromJson(Invoice, res.data.invoice))
    )
  }

  editSchoolInvoice(body:{
    invoiceId:string,
    amount?:string
    media:string
  }): Observable<Invoice> {
    return this.baseAPI.patch(ApiConstant.Edit_SCHOOL_INVOICE, body).pipe(
      map((res) => this.mapper.fromJson(Invoice, res.data.invoice))
    )
  }

  getStudentInvoices(params:{}): Observable<StudentInvoiceList> {
    return this.baseAPI.get(ApiConstant.GET_ALL_STUDENT_INVOICES,{params}).pipe(
      map((res) => this.mapper.fromJson(StudentInvoiceList, res.data))
    )
  }

  addStudentInvoice(body:{
    studentId:string,
    parentId:string,
    amount:string
    media:string
  }): Observable<StudentInvoice> {
    return this.baseAPI.post(ApiConstant.ADD_STUDENT_INVOICE, body).pipe(
      map((res) => this.mapper.fromJson(StudentInvoice, res.data.invoice))
    )
  }

  editStudentInvoice(body:{
    invoiceId:string,
    amount?:string
    media:string
  }): Observable<StudentInvoice> {
    return this.baseAPI.patch(ApiConstant.Edit_STUDENT_INVOICE, body).pipe(
      map((res) => this.mapper.fromJson(StudentInvoice, res.data.invoice))
    )
  }

  createPayment(body:{
    invoiceId:string,
  }): Observable<Payment> {
    return this.baseAPI.post(ApiConstant.CREATE_PAYMENT, body).pipe(
      map((res) => this.mapper.fromJson(Payment, res.data))
    )
  }
}
