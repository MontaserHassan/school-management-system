import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesUtil } from '../../../shared/utils/routes.util';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { passwordMatchValidator } from '../../../shared/utils/custome-validator.util';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent extends BaseComponent implements OnInit {
  pageTwo = false;
  signUp = false;
  loginFirstTime = false;

  loginForm!: FormGroup;
  signUpForm!: FormGroup;
  addPasswordForm!: FormGroup;

  protected RoutesUtil = RoutesUtil
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private authService: AuthService
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

    this.addPasswordForm = this.builder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator() })
  }

  isFieldInvalid(form: FormGroup, field: string): boolean | undefined {
    return form.get(field)?.invalid && (form.get(field)?.touched || form.get(field)?.dirty);
  }

  onLogin() {
    this.loginForm.markAllAsTouched()
    this.load(this.authService.login(this.loginForm.value), {
      isLoadingTransparent: true,
    }).subscribe(res => {
      this.router.navigate([this.RoutesUtil.UserProfile.url({ params: { id: res.user?._id }})])
    }, err => {
      if (err.errors[0] === "You need to update your password password") {
        this.loginFirstTime = true
        this.pageTwo = true
      }
    })
  }

  setPassword() {
    const email = this.loginForm.get('email')?.value
    const password = this.addPasswordForm.get('password')?.value
    const body = {
      email,
      password,
    }

    this.load(this.authService.updatePassword(body), {
      isLoadingTransparent: true,
    }).subscribe(res => {
      this.signUp = false
      this.pageTwo = false
    })
  }

  onSignUp() {
    this.signUpForm.markAllAsTouched()
    this.signUp = true
    this.pageTwo = false
  }

  switchPage() {
    this.pageTwo = !this.pageTwo
  }
}

