import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { School } from '../../models/school.model';
import { SchoolService } from '../../services/school.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-school',
  templateUrl: './view-school.component.html',
  styleUrls: ['./view-school.component.scss']
})
export class ViewSchoolComponent extends BaseComponent implements OnInit {
  school!: School;

  constructor(private activeRoute: ActivatedRoute, private schoolService: SchoolService) {
    super();
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      const id = params?.['id']
      if (id) {
        this.getSchoolDetails(id);
      }
    })
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active': return 'p-chip-success';
      case 'pending': return 'p-chip-warning';
      case 'inactive': return 'p-chip-danger';
      default: return '';
    }
  }

  getSchoolDetails(id: string): void {
    this.load(this.schoolService.getSchoolDetails(id), {
      isLoadingTransparent: true,
    }).subscribe((res) => {
      this.school = res;
    })
  }
}
