/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DomainListComponent } from './domain-list.component';

describe('DomainListComponent', () => {
  let component: DomainListComponent;
  let fixture: ComponentFixture<DomainListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
