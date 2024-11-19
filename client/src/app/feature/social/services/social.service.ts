import { Injectable } from '@angular/core';
import { ApiBaseService } from '../../shared/services/general/api-base.service';
import { Mapper } from '../../shared/mapper/base-mapper.mapper';
import { map, Observable } from 'rxjs';
import { ApiConstant } from '../../shared/config/api.constant';
import { Ticket, ticketList } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  constructor(
    private baseAPI: ApiBaseService,
    private mapper: Mapper
  ) { }

  sendEmail(body:{
    receiverIds: string[],
    domain: string,
    content: string,
  }): Observable<any> {
    return this.baseAPI.post(ApiConstant.SEND_EMAIL, body).pipe(
      map((res) => res)
    )
  }

  addTicket(body: {
    receiver: string,
  }): Observable<Ticket> {
    return this.baseAPI.post(ApiConstant.ADD_TICKET, body).pipe(
      map((res) => this.mapper.fromJson(Ticket, res.data.ticket))
    )
  }

  sendMessage(body: {
    ticketId: string,
    message: string,
  }): Observable<Ticket> {
    return this.baseAPI.patch(ApiConstant.SEND_MESSAGE, body).pipe(
      map((res) => this.mapper.fromJson(Ticket, res.data.ticket))
    )
  }

  getTickets(params:{}): Observable<ticketList> {
    return this.baseAPI.get(ApiConstant.GET_TICKETS,{params}).pipe(
      map((res) => this.mapper.fromJson(ticketList, res.data))
    )
  }

  getTicketById(id: string): Observable<Ticket> {
    return this.baseAPI.get(ApiConstant.GET_TICKET_BY_ID.replace('{id}', id)).pipe(
      map((res) => this.mapper.fromJson(Ticket, res.data.ticket))
    )
  }
}
