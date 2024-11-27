import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { EventModel } from '../../models/event.model';
import { SocialService } from '../../services/social.service';
import { Lookup } from '../../../shared/enums/lookup.enum';
import { RolesConstants } from '../../../shared/config/roles-constants';

export enum EventResponse {
  "Accept" = 'success',
  "not response" = 'secondary',
  "Reject" = 'warning',
}


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent  extends BaseComponent implements OnInit {
  events: EventModel[] = [];
  eventResponse:any

  protected Lookup = Lookup
  protected RolesConstants = RolesConstants

  constructor(private socialService: SocialService) {
    super();
  }

  ngOnInit(): void {
    this.getEvents();
  }

  setResColor(res: string): "success" | "secondary" | "warning" | undefined {
    return EventResponse[res as keyof typeof EventResponse] || undefined;
  }


  getEvents() {
    this.load(
      this.socialService.getEvents({}),
      {
        isLoadingTransparent: true,
      }
    ).subscribe((events) => {
      this.events = events.events;
    })
  }

  getEventDetails(event: EventModel) {
    this.load(
      this.socialService.getEventById(event.eventId),
      {
        isLoadingTransparent: true,
      }
    ).subscribe((res) => {
      event.eventDetails = res.eventDetails
    })
  }

  updateResponse(eventResponse:any, event: EventModel) {
    const payload = {
      eventId: event.eventId,
      newResponse: eventResponse.value,
    }
    this.load(
      this.socialService.updateEventResponse(payload),
      {
        isLoadingTransparent: true,
      }
    ).subscribe(() => {
      event.response = eventResponse.value
    })
  }
}
