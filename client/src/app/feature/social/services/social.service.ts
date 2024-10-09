import { Injectable } from '@angular/core';
import { ApiBaseService } from '../../shared/services/general/api-base.service';
import { Mapper } from '../../shared/mapper/base-mapper.mapper';
import { map, Observable } from 'rxjs';
import { ApiConstant } from '../../shared/config/api.constant';

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
    subject: string,
    content: string,
  }): Observable<any> {
    return this.baseAPI.post(ApiConstant.SEND_EMAIL, body).pipe(
      map((res) => res)
    )
  }
}
