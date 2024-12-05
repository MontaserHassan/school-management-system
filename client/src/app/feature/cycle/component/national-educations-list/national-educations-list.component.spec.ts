import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalEducationsListComponent } from './national-educations-list.component';

describe('NationalEducationsListComponent', () => {
  let component: NationalEducationsListComponent;
  let fixture: ComponentFixture<NationalEducationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NationalEducationsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NationalEducationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
