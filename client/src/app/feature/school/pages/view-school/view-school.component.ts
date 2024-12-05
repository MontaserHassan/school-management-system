import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { School } from '../../models/school.model';
import { SchoolService } from '../../services/school.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesUtil } from '../../../shared/utils/routes.util';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { SubscriptionStatus } from '../../../shared/config/drop-down-value.constant';
import { EditSchoolDialogComponent } from '../../components/edit-school-dialog/edit-school-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordConfirmationDialogComponent } from '../../../shared/component/reset-password-confirmation-dialog/reset-password-confirmation-dialog.component';

@Component({
  selector: 'app-view-school',
  templateUrl: './view-school.component.html',
  styleUrls: ['./view-school.component.scss']
})
export class ViewSchoolComponent extends BaseComponent implements OnInit {
  school: School= new School();
  id!: string;
  subscriptionActions!:MenuItem[];

  protected subscriptionStatus = SubscriptionStatus

  constructor(private activeRoute: ActivatedRoute, private schoolService: SchoolService, private router: Router , private matDialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.id = params?.['id']
      if (this.id) {
        this.getSchoolDetails(this.id);
      }
    })
    this.generateMenu()
  }

  protected override onLanguageChange(): void {
    this.generateMenu();
  }

  generateMenu(): void {
    this.subscriptionActions = [
      {
        label: this.translate('actions'),
        items: this.subscriptionStatus.map((status) => ({
          label: this.translate("school.subscriptionStatus."+ status.label),
          command: () => this.handleClick(status.value)
        }))
      }
    ];
  }

  getSchoolDetails(id: string,params?:{isExport?:boolean}): void {
    this.load(this.schoolService.getSchoolDetails(id,params), {
      isLoadingTransparent: true,
    }).subscribe((res) => {
      if(!params?.isExport){
        this.school = res.school || new School();
      }
    })
  }

  goToUserProfile(id: string): void {
    this.router.navigate([RoutesUtil.UserProfile.url({params: {id}})]);
  }

  handleClick(value: string): void {
    const body = {
      schoolId: this.school._id || "",
      subscriptionStatus: value
    }

    this.load(this.schoolService.editSchool(body), {
      isLoadingTransparent: true,
    }).subscribe((res) => {
      this.getSchoolDetails(this.id);
    })
  }

  handleEditClick(){
    const dialogRef = this.matDialog.open(EditSchoolDialogComponent, {
      data: {school : this.school}
    })

    dialogRef.afterClosed().subscribe((res) => {
      if(res){
        this.getSchoolDetails(this.id);
      }
    })
  }

  handleRestPassword(){
    const dialog = this.matDialog.open(ResetPasswordConfirmationDialogComponent, {
      data: { user: this.school.admin }
    })
  }

  handleExport(): void {
    this.getSchoolDetails(this.id, {isExport: true})
  }
}
