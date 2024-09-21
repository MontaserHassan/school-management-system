import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../services/school.service';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { School } from '../../models/school.model';
import { Router } from '@angular/router';
import { RoutesUtil } from '../../../shared/utils/routes.util';

@Component({
  selector: 'app-schools-list',
  templateUrl: './schools-list.component.html',
  styleUrls: ['./schools-list.component.scss']
})
export class SchoolsListComponent extends BaseComponent implements OnInit {
  schools!:School[]

  constructor(private schoolService:SchoolService, private router:Router) {
    super();
  }

  ngOnInit(): void {
    this.getSchools()
  }


  getSchools():void{
    const params = { page: this.offset.toString(), limit: this.pageSize.toString() };

    this.load(this.schoolService.getSchools(params), {
      isLoadingTransparent: true,
    }).subscribe((res) => {
      this.schools = res.schools || [];
      this.totalRowsCount = res.totalDocuments || res.schools?.length || 1;
      this.pageSize = res?.limit || 0

    })
  }

  paginate(event: any): void {
    this.offset = event.page + 1;
    this.pageSize = event.rows;
    this.getSchools();
  }

  navigateToSchoolDetails(id: string): void {
    this.router.navigate([RoutesUtil.SchoolView.url({ params: { id } })]);
  }
}
