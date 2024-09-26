/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddStudentToClassRoomDialogComponent } from './add-student-to-class-room-dialog.component';

describe('AddStudentToClassRoomDialogComponent', () => {
  let component: AddStudentToClassRoomDialogComponent;
  let fixture: ComponentFixture<AddStudentToClassRoomDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentToClassRoomDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentToClassRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
