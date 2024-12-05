import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Lookup } from '../../../shared/enums/lookup.enum';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { EducationDomain } from '../../models/cycle.model';
import { EducationDomainService } from '../../services/education-domain.service';
import { LookupModel } from '../../../shared/models/lookup.model';

@Component({
  selector: 'app-add-edit-educations-domains-dialog',
  templateUrl: './add-edit-educations-domains-dialog.component.html',
  styleUrl: './add-edit-educations-domains-dialog.component.scss'
})
export class AddEditEducationsDomainsDialogComponent extends BaseComponent {
  educationDomainForm!: FormGroup;

  protected Lookup = Lookup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditEducationsDomainsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {schoolId: string ,nationalEducation:EducationDomain,edit:boolean},
    private EducationDomainService:EducationDomainService
  ) {
    super();
  }

  ngOnInit(): void {

    const {educationDomainName, educationDomainDescription, cycleId, cycleName, domains} = this.data?.nationalEducation || {}

    this.educationDomainForm = this.fb.group({
      educationDomainName: [
        educationDomainName || '',
        [Validators.required],
      ],
      educationDomainDescription: [
        educationDomainDescription || '',
        [Validators.required],
      ],
      cycleId: [cycleId ? {label:cycleName, value:cycleId}: '', [Validators.required]],
      domains: [domains?.length ? domains.map(domain=> ({label:domain.domainName, value:domain.domainId})) : '' , [Validators.required]],
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitForm(): void {
    if (this.educationDomainForm.valid) {
      const {
        educationDomainName,
        educationDomainDescription,
        domains,
        cycleId,
      } = this.educationDomainForm.value;

      const payload = {
        educationDomainId: this.data.nationalEducation?._id ,
        educationDomainName,
        educationDomainDescription,
        domains: domains.map((domain: any) => domain.value),
        cycleId: cycleId.value,
        schoolId: this.data.edit ? undefined : this.data.schoolId,
      }


      this.load(
        this.data.nationalEducation?._id ? this.EducationDomainService.editEduDomain(payload) :  this.EducationDomainService.addEduDomain(payload),
        {
          isLoadingTransparent: true,
        }
      ).subscribe((res) => {
        this.dialogRef.close(true);
      }
      )
    }
  }
}
