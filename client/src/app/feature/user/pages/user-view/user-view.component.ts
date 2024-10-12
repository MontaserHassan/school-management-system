import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { User } from '../../../shared/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { Student } from '../../../student/models/student.model';
import { ParentService } from '../../service/parent.service';
import { MenuItem } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserDialogComponent } from '../../component/update-user-dialog/update-user-dialog.component';
import { ResetPasswordConfirmationDialogComponent } from '../../component/reset-password-confirmation-dialog/reset-password-confirmation-dialog.component';
import { RoutesUtil } from '../../../shared/utils/routes.util';
import { RolesConstants } from '../../../shared/config/roles-constants';
import { UserRole } from '../../../shared/enums/user-role.enum';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent extends BaseComponent implements OnInit {
  currentUser!: User | undefined;
  students!: Student[]
  userActions: MenuItem[] = [];
  id!: string
  protected RolesConstants = RolesConstants
  protected UserRole = UserRole

  constructor(private authService: AuthService, private activeRoute: ActivatedRoute, private parentService: ParentService, private matDialog: MatDialog, private router: Router) {
    super()
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.id = params?.['id']
      this.getUserProfile(this.id)
    })

    this.generateMenu();
  }

  protected override onLanguageChange(): void {
    this.generateMenu();
  }

  generateMenu() {
    this.userActions = [
      {
        label: this.translate('actions'),
        items: [
          {
            label: this.translate('edit'),
            icon: 'pi pi-pencil',
          },
          {
            label: this.translate('resetPassword'),
            icon: 'pi pi-spin pi-cog',
          }
        ]
      }
    ]
  }

  getUserProfile(id: string) {
    this.load(
      this.authService.getUserProfile(id).pipe(
        switchMap((res) => {
          this.currentUser = res;

          if (res.role === 'parent') {
            return this.parentService.getStudentByParentId(id).pipe(
              map((students) => {
                this.students = students;
                return res;
              })
            );
          }

          return of(res);
        })
      ),
      { isLoadingTransparent: true }
    ).subscribe((res) => {
      this.currentUser = res;
    });
  }

  gotoStudentDetails(studentId: string) {
    this.router.navigate([RoutesUtil.StudentView.url({ params: { id: studentId } })])
  }

  handleClick(label: string) {
    if (!this.userActions.length) {
      return
    }
    if (label === this.userActions?.[0]?.items?.[0]?.label) {
      const dialog = this.matDialog.open(UpdateUserDialogComponent, {
        data: { user: this.currentUser }
      })

      dialog.afterClosed().subscribe(res => {
        if (res) {
          this.getUserProfile(this.id)
        }
      })
    }
    else if (label === this.userActions?.[0]?.items?.[1]?.label) {
      const dialog = this.matDialog.open(ResetPasswordConfirmationDialogComponent, {
        data: { user: this.currentUser }
      })

      dialog.afterClosed().subscribe(res => {
        if (res) {
          this.getUserProfile(this.id)
        }
      })
    }
  }

  navigateToSchoolDetails(id: string): void {
    this.router.navigate([RoutesUtil.SchoolView.url({ params: { id } })]);
  }
}
