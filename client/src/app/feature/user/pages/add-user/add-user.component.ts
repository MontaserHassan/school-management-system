import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { RoutesUtil } from '../../../shared/utils/routes.util';
import { Lookup } from '../../../shared/enums/lookup.enum';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent extends BaseComponent implements OnInit {
  userForm!: FormGroup;
  protected Lookup = Lookup;

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
      const {userName, email, role} = this.userForm.value;
      const payload = {
        userName,
        email,
        role : role.label
      }
      this.load(this.authService.addUser(payload), {isLoadingTransparent: true}).subscribe(res => {
        this.showSuccessMessage(res.responseMessage);
        console.log(res);

        this.router.navigate([RoutesUtil.UserProfile.url({params: {id: res?.user?.code}})]);
      })
    }
  }
}
