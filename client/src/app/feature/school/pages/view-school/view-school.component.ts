import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { School } from '../../models/school.model';
import { SchoolService } from '../../services/school.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesUtil } from '../../../shared/utils/routes.util';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-view-school',
  templateUrl: './view-school.component.html',
  styleUrls: ['./view-school.component.scss']
})
export class ViewSchoolComponent extends BaseComponent implements OnInit {
  school: School= new School();

  subscriptionActions!:MenuItem[];

  constructor(private activeRoute: ActivatedRoute, private schoolService: SchoolService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      const id = params?.['id']
      if (id) {
        this.getSchoolDetails(id);
      }
    })

    this.subscriptionActions = [
      {
        label: 'Actions',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-pencil',
          },
          {
            label: 'Delete',
            icon: 'pi pi-trash',
          }
        ]
      }
    ];
  }

  getSchoolDetails(id: string): void {
    this.load(this.schoolService.getSchoolDetails(id), {
      isLoadingTransparent: true,
    }).subscribe((res) => {
      this.school = res;
    })
  }

  goToUserProfile(id: string): void {
    this.router.navigate([RoutesUtil.UserProfile.url({params: {id}})]);
  }


  handleClick(label: string, school: School): void {
    if (label === this.classroomActions?.[0]?.items?.[0]?.label) {
      this.viewDetails(classroom._id || "");
    }
    else if (label === this.classroomActions?.[0]?.items?.[1]?.label) {
      const dialog = this.matDialog.open(EditClassroomDialogComponent, {
        data: { classroom },
      })

      dialog.afterClosed().subscribe(res => {
        if (res) {
          this.getClassRoomList()
        }
      })
    }
    else if (label === this.classroomActions?.[0]?.items?.[2]?.label) {
      const dialog = this.matDialog.open(RemoveClassroomDialogComponent, {
        data: { roomId: classroom._id }
      })

      dialog.afterClosed().subscribe(res => {
        if (res) {
          this.getClassRoomList()
        }
      })
    }
  }
}
