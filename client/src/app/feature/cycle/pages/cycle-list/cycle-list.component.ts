import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { Lookup } from '../../../shared/enums/lookup.enum';
import { FormControl } from '@angular/forms';
import { SchoolService } from '../../../school/services/school.service';
import { Cycle, EducationDomain } from '../../models/cycle.model';
import { MatDialog } from '@angular/material/dialog';
import { AddEditEducationsDomainsDialogComponent } from '../../component/add-edit-educations-domains-dialog/add-edit-educations-domains-dialog.component';
import { map, of, switchMap } from 'rxjs';
import { EducationDomainService } from '../../services/education-domain.service';

@Component({
  selector: 'app-cycle-list',
  templateUrl: './cycle-list.component.html',
  styleUrl: './cycle-list.component.scss'
})
export class CycleListComponent extends BaseComponent implements OnInit {
  cycles!: Cycle[]
  protected Lookup = Lookup

  eduDomains!: { [key: string]: EducationDomain[] }

  selectSchool: FormControl = new FormControl();
  constructor(private schoolService: SchoolService, private educationDomainService: EducationDomainService, private dialog: MatDialog) {
    super();
  }

  ngOnInit() { }

  getCycleSchool(id: string) {
    this.load(this.schoolService.getSchoolDetails(id), {
      isLoadingTransparent: true,
    }).pipe(
      switchMap((school) => {
        return this.educationDomainService.getAllEduDomains(id).pipe(
          map((eduDomains) => {
            this.groupEducationDomainByCycle(eduDomains)
            return {
              cycles: school.cycles?.map((cycle) => {
                return {
                  ...cycle,
                  educationDomains: this.eduDomains[cycle._id] || []
                }
              })
            }
          })
        )
      })
    ).subscribe((res) => {
      this.cycles = res.cycles || []
      console.log(this.cycles);

    })
  }

  onSelectSchool(event: any) {
    this.getCycleSchool(event.value)
  }

  addEduDomain() {
    const dialogRef = this.dialog.open(AddEditEducationsDomainsDialogComponent, {
      width: '600px',
      data: { schoolId: this.selectSchool.value }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getCycleSchool(this.selectSchool.value)
      }
    });
  }

  groupEducationDomainByCycle(eduDomains: EducationDomain[]) {
    this.eduDomains = eduDomains.reduce((acc: { [key: string]: EducationDomain[] }, eduDomain: EducationDomain) => {
      if (!acc[eduDomain.cycleId]) {
        acc[eduDomain.cycleId] = []
      }
      acc[eduDomain.cycleId].push(eduDomain)
      return acc;
    }, {});
  }

  onEducationDomainChange(event: any) {
    this.getCycleSchool(this.selectSchool.value)
  }
}
