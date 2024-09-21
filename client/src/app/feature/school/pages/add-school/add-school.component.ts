import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { SchoolService } from '../../services/school.service';
import { Router } from '@angular/router';
import { RoutesUtil } from '../../../shared/utils/routes.util';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.scss']
})
export class AddSchoolComponent extends BaseComponent implements OnInit {

  schoolForm!: FormGroup;

  constructor(private fb: FormBuilder, private schoolService: SchoolService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.schoolForm = this.fb.group({
      schoolName: ['', Validators.required],
      subscriptionFees: ['', Validators.required],
      adminUserName: ['', Validators.required],
      adminEmail: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.schoolForm.valid) {
      const { schoolName, subscriptionFees, adminEmail, adminUserName } = this.schoolForm.value;
      const body = {
        schoolName,
        subscriptionFees,
        admin: {
          email: adminEmail,
          userName: adminUserName
        }
      }

      this.load(this.schoolService.addSchool(body), {
        isLoadingTransparent: true,
      }).subscribe((res) => {
        this.router.navigate([RoutesUtil.SchoolView.url({ params: { id: res._id } })]);
      })
    }
  }

}
