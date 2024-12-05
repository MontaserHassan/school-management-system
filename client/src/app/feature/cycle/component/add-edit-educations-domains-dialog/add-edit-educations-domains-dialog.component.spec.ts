import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEducationsDomainsDialogComponent } from './add-edit-educations-domains-dialog.component';

describe('AddEditEducationsDomainsDialogComponent', () => {
  let component: AddEditEducationsDomainsDialogComponent;
  let fixture: ComponentFixture<AddEditEducationsDomainsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditEducationsDomainsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditEducationsDomainsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
