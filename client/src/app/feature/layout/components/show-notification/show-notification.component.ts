import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Notification } from '../../models/notification.model';
import { RoutesUtil } from '../../../shared/utils/routes.util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-notification',
  templateUrl: './show-notification.component.html',
  styleUrls: ['./show-notification.component.scss']
})
export class ShowNotificationComponent extends BaseComponent implements OnInit {
  protected RoutesUtil = RoutesUtil

  constructor(
    public dialogRef: MatDialogRef<ShowNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Notification,
    private authService: AuthService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.load(
      this.authService.getNotificationById(this.data._id), {
        isLoadingTransparent: true
      }
    ).subscribe((res) => {
      this.data = res;
    })
  }

  navigateToTicket(ticketId: string) {
    this.router.navigate(
      [RoutesUtil.SocialTicket.url()],
      { queryParams: { id: ticketId } }
    );
  }

}
