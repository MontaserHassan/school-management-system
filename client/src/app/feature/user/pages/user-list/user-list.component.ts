import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesUtil } from '../../../shared/utils/routes.util';
import { User } from '../../../shared/models/user.model';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { MenuItem } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserDialogComponent } from '../../component/update-user-dialog/update-user-dialog.component';
import { ResetPasswordConfirmationDialogComponent } from '../../component/reset-password-confirmation-dialog/reset-password-confirmation-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends BaseComponent implements OnInit {
  users!: User[]
  userActions: MenuItem[] = [];


  constructor(private router: Router, private authService: AuthService, private matDialog: MatDialog) {
    super()
  }

  ngOnInit() {
    this.userActions = [
      {
        label: 'Actions',
        items: [
          {
            label: 'View Profile',
            icon: 'pi pi-user',
          },
          {
            label: 'Edit User',
            icon: 'pi pi-pencil',
          },
          {
            label: 'Reset Password',
            icon: 'pi pi-spin pi-cog'
          }
        ]
      }
    ];
  }

  getUsersList(isExport?: boolean) {
    const params = { page: this.offset, limit: this.pageSize , isExport};
    this.load(this.authService.getUsersList(params)).subscribe(res => {
      if (!isExport) {
        this.users = res?.users || []
        this.totalRowsCount = res.totalDocuments || 1;
        this.pageSize = res?.limit || 0
      }
    })
  }

  viewProfile(user: any) {
    this.router.navigate([RoutesUtil.UserProfile.url({ params: { id: user._id } })]);
  }


  paginate(event: any): void {
    this.offset = event.first / event.rows + 1;
    this.pageSize = event.rows;
    this.getUsersList();
  }

  handleClick(label: string, user: User) {
    if (!this.userActions.length) {
      return
    }
    if (label === this.userActions?.[0]?.items?.[0]?.label) {
      this.viewProfile(user);
    }
    else if (label === this.userActions?.[0]?.items?.[1]?.label) {
      const dialog = this.matDialog.open(UpdateUserDialogComponent, {
        data: { user }
      })

      dialog.afterClosed().subscribe(res => {
        if (res) {
          this.getUsersList()
        }
      })
    }
    else if (label === this.userActions?.[0]?.items?.[2]?.label) {
      const dialog = this.matDialog.open(ResetPasswordConfirmationDialogComponent, {
        data: { user }
      })

      dialog.afterClosed().subscribe(res => {
        if (res) {
          this.getUsersList()
        }
      })
    }
  }

  handleExport() {
    this.getUsersList(true)
  }
}
