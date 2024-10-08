import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { School } from '../../models/school.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchoolService } from '../../services/school.service';
import { Currency, SubscriptionWay } from '../../../shared/config/drop-down-value.constant';

@Component({
  selector: 'app-edit-school-dialog',
  templateUrl: './edit-school-dialog.component.html',
  styleUrls: ['./edit-school-dialog.component.scss']
})
export class EditSchoolDialogComponent extends BaseComponent implements OnInit {
  schoolForm!: FormGroup;
  protected currency = Currency;
  protected subscriptionWay = SubscriptionWay

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditSchoolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { school: School },
    private schoolService: SchoolService
  ) {
    super()
  }

  ngOnInit(): void {
    this.schoolForm = this.fb.group({
      schoolName: [ this.data.school.schoolName , Validators.required],
      subscriptionFees: [this.data.school.subscriptionFees, Validators.required],
      currencyOfSubscription: [ this.currency.find(el=> el.label === this.data.school.currencyOfSubscription), Validators.required],
      subscriptionWay: [ this.subscriptionWay.find(el=> el.value === this.data.school.subscriptionWay) , Validators.required],
    });
  }

  onSubmit(): void {
    if (this.schoolForm.valid) {
      const { schoolName, subscriptionFees, currencyOfSubscription, subscriptionWay} = this.schoolForm.value;
      const body = {
        schoolId: this.data.school._id || "",
        schoolName,
        subscriptionFees,
        subscriptionWay: subscriptionWay.value,
        currencyOfSubscription: currencyOfSubscription.value,
      }

      this.load(this.schoolService.editSchool(body), {
        isLoadingTransparent: true,
      }).subscribe((res) => {
        this.dialogRef.close(res);
      })
    }
  }
}
