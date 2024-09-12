import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesUtil } from '../../../shared/utils/routes.util';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { SectionStateStatus } from '../../../shared/enums/section-state-status.enum';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent extends BaseComponent implements OnInit {
  signUp = false;

  loginForm!: FormGroup;
  signUpForm!: FormGroup;

  protected RoutesUtil = RoutesUtil
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private authService:AuthService
  ) {
    super()
  }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.loginForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })

    this.signUpForm = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  isFieldInvalid(form: FormGroup, field: string): boolean | undefined {
    return form.get(field)?.invalid && (form.get(field)?.touched || form.get(field)?.dirty);
  }

  onLogin() {
    this.loginForm.markAllAsTouched()
    this.load(this.authService.login(this.loginForm.value),{
      isLoadingTransparent: true,
    }).subscribe(res=>{
      this.router.navigate([this.RoutesUtil.Dashboard.path])
    })

  }

  onSignUp() {
    this.signUpForm.markAllAsTouched()
    this.signUp = false
  }
}

