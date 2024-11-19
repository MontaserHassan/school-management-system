/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddDomainComponent } from './add-domain.component';

describe('AddDomainComponent', () => {
  let component: AddDomainComponent;
  let fixture: ComponentFixture<AddDomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDomainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
