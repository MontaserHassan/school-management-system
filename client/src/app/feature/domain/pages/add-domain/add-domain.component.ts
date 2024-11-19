import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { DomainService } from '../../services/domain.service';
import { Router } from '@angular/router';
import { RoutesUtil } from '../../../shared/utils/routes.util';

@Component({
  selector: 'app-add-domain',
  templateUrl: './add-domain.component.html',
  styleUrls: ['./add-domain.component.scss']
})
export class AddDomainComponent extends BaseComponent implements OnInit {
  domainForm!: FormGroup;

  constructor(private fb: FormBuilder, private domainService: DomainService, private router: Router) {
    super()
  }

  ngOnInit(): void {
    this.domainForm = this.fb.group({
      domainName: ['', Validators.required],
      courseTime: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  onSubmit() {
    if (this.domainForm.valid) {
      const newDomain = this.domainForm.value;
      this.load(this.domainService.addDomain(newDomain), { isLoadingTransparent: true }).subscribe(domain => {
        this.router.navigate([RoutesUtil.DomainView.url({ params: { id: domain._id } })])
      })
    }
  }
}
