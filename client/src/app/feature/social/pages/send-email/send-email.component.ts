import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lookup } from '../../../shared/enums/lookup.enum';
import { take } from 'rxjs';
import { RolesConstants } from '../../../shared/config/roles-constants';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { SocialService } from '../../services/social.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent extends BaseComponent {
  emailForm: FormGroup;
  roles: string[] = [ 'all', 'parent', 'director', 'teacher', 'superAdmin',];
  lookUpExtraParams = {}
  protected Lookup = Lookup
  protected RolesConstants = RolesConstants

  constructor(private fb: FormBuilder , private socialService: SocialService) {
    super();
    this.emailForm = this.fb.group({
      receiverIds: ['', Validators.required],
      subject: ['', Validators.required],
      content: ['', Validators.required],
      role: ['all'],
    });

    this.emailForm.get('role')?.valueChanges.pipe(take(200)).subscribe((value) => {
      if (value) {
        this.emailForm.get('receiverIds')?.setValue([]);
        if (value === 'all') {
          this.lookUpExtraParams = {};
          return
        }
        this.lookUpExtraParams = { role: value };
      }
    });
  }

  sendEmail() {
    if (this.emailForm.valid) {
      const body = {
        receiverIds: this.emailForm.get('receiverIds')?.value.map((item: any) => item.value),
        subject: this.emailForm.get('subject')?.value,
        content: this.emailForm.get('content')?.value,
      }
      this.load(
        this.socialService.sendEmail(body),
        {isLoadingTransparent: true}
      ).subscribe((res) => {
        this.emailForm.reset();
        this.emailForm.get('role')?.setValue('all');
        this.showSuccessMessage(res.responseMessage)
      })
    } else {
      this.emailForm.markAllAsTouched();
    }
  }
}
