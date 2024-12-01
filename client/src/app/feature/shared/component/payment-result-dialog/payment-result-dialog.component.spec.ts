import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentResultDialogComponent } from './payment-result-dialog.component';

describe('PaymentResultDialogComponent', () => {
  let component: PaymentResultDialogComponent;
  let fixture: ComponentFixture<PaymentResultDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentResultDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentResultDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
