import { TestBed } from '@angular/core/testing';

import { EducationDomainService } from './education-domain.service';

describe('EducationDomainService', () => {
  let service: EducationDomainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationDomainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
