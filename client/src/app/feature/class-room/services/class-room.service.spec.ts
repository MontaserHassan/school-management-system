/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClassRoomService } from './class-room.service';

describe('Service: ClassRoom', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassRoomService]
    });
  });

  it('should ...', inject([ClassRoomService], (service: ClassRoomService) => {
    expect(service).toBeTruthy();
  }));
});
