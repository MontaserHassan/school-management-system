/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DomainActionComponent } from '../domain-action/domain-action.component';

describe('DomainActionComponent', () => {
  let component: DomainActionComponent;
  let fixture: ComponentFixture<DomainActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
