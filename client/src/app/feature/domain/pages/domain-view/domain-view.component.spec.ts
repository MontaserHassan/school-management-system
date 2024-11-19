/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DomainViewComponent } from './domain-view.component';

describe('DomainViewComponent', () => {
  let component: DomainViewComponent;
  let fixture: ComponentFixture<DomainViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
