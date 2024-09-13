import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { RoutesUtil } from '../../../shared/utils/routes.util';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent extends BaseComponent implements OnInit {
  userForm!: FormGroup;
  roles: any[] = [
    { label: 'Super Admin', value: 'superAdmin' },
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' }
  ];

  constructor(private fb: FormBuilder,private authService:AuthService,private router:Router) {
    super()
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const newUser = this.userForm.value;
      this.load(this.authService.addUser(newUser), {isLoadingTransparent: true}).subscribe(res => {
        this.showSuccessMessage(res.responseMessage);
        this.router.navigate([RoutesUtil.UserProfile.url({params: {id: res?.user?.code}})]);
      })
    }
  }
}
