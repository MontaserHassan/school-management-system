import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Domain } from '../../../domain/models/domain.model';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { EducationDomain } from '../../models/cycle.model';
import { MenuItem } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { AddEditEducationsDomainsDialogComponent } from '../add-edit-educations-domains-dialog/add-edit-educations-domains-dialog.component';
import { School } from '../../../school/models/school.model';
import { RolesConstants } from '../../../shared/config/roles-constants';

@Component({
  selector: 'app-national-educations-list',
  templateUrl: './national-educations-list.component.html',
  styleUrl: './national-educations-list.component.scss'
})
export class NationalEducationsListComponent extends BaseComponent  implements OnInit{
  @Input() educationDomain!:EducationDomain[]
  @Input() ageGroup!:string
  @Output() onEducationDomainChange = new EventEmitter()
  educationDomainAction!:MenuItem[]

  protected RolesConstants = RolesConstants

  constructor(private dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.generateMenu()
  }

  protected override onLanguageChange(): void {
    this.generateMenu();
  }

  generateMenu() {
    this.educationDomainAction = [
      {
        label: this.translate('actions'),
        items: [
          {
            label: this.translate('edit'),
            icon: 'pi pi-pencil'
          },
        ]
      }
    ];
  }


  handleClick(label: string, nationalEducation: EducationDomain): void {
    if (!this.educationDomainAction.length) {
      return
    }
    else if (label === this.educationDomainAction?.[0]?.items?.[0]?.label) {
      const dialog = this.dialog.open(AddEditEducationsDomainsDialogComponent, {
        data: { schoolId:nationalEducation.schoolId, nationalEducation,edit:true },
      })

      dialog.afterClosed().subscribe(res => {
        if (res) {
          this.onEducationDomainChange.emit(res)
        }
      })
    }
  }
}
