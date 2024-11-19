import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Domain } from '../../models/domain.model';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { DomainService } from '../../services/domain.service';

@Component({
  selector: 'app-edit-domain-dialog',
  templateUrl: './edit-domain-dialog.component.html',
  styleUrls: ['./edit-domain-dialog.component.scss']
})
export class EditDomainDialogComponent extends BaseComponent {
 editDomainForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditDomainDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { domain:Domain},
    private domainService: DomainService
  ) {
    super();
    this.editDomainForm = this.fb.group({
      domainName: [data.domain.domainName || "", [Validators.required]],
      courseTime: [data.domain.courseTime || "", [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.editDomainForm.valid) {
      this.load(
        this.domainService.editDomain({
          domainName: this.editDomainForm.value.domainName,
          courseTime: this.editDomainForm.value.courseTime,
          domainId: this.data.domain._id || ""
        })
      ).subscribe(res => {
        this.dialogRef.close(res);
      })
    }
  }

}
