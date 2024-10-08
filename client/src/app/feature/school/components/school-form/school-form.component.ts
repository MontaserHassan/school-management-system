import { Component, Input, OnInit } from '@angular/core';
import { Lookup } from '../../../shared/enums/lookup.enum';
import { SubscriptionWay } from '../../../shared/config/drop-down-value.constant';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-school-form',
  templateUrl: './school-form.component.html',
  styleUrls: ['./school-form.component.scss']
})
export class SchoolFormComponent implements OnInit {
  @Input() schoolForm!: FormGroup;
  @Input() editMode!: boolean;
  protected Lookup = Lookup;
  protected subscriptionWay = SubscriptionWay

  constructor() { }

  ngOnInit() {
  }

}
