import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { DomainService } from '../../services/domain.service';
import { Router } from '@angular/router';
import { RoutesUtil } from '../../../shared/utils/routes.util';
import { Lookup } from '../../../shared/enums/lookup.enum';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-add-domain',
  templateUrl: './add-domain.component.html',
  styleUrls: ['./add-domain.component.scss']
})
export class AddDomainComponent extends BaseComponent implements OnInit {
  domainForm!: FormGroup;
  protected Lookup = Lookup
  currentUser!:User

  constructor(private authService:AuthService, private fb: FormBuilder, private domainService: DomainService, private router: Router) {
    super()

  }

  ngOnInit(): void {
    this.domainForm = this.fb.group({
      domainName: ['', Validators.required],
      courseTime: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      group: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.domainForm.valid) {
      const formData = this.domainForm.value;
      const newDomain = {
        domainName: formData.domainName,
        courseTime: formData.courseTime,
        groupId: formData.group.value
      };

      this.load(this.domainService.addDomain(newDomain), { isLoadingTransparent: true }).subscribe(domain => {
        this.router.navigate([RoutesUtil.DomainView.url({ params: { id: domain._id } })])
        this.authService.currentUser$.next(
          { ...this.authService.currentUser$.value,
            user: { ...this.authService.currentUser$.value.user, notifySuperAdmin: true }
          })
          this.authService.saveUser()
      })
    }
  }
}
