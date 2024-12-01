import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-result-dialog',
  templateUrl: './payment-result-dialog.component.html',
  styleUrl: './payment-result-dialog.component.scss'
})
export class PaymentResultDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {isSuccess: boolean}
  ) {}
}
