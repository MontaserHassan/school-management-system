import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Notification } from '../../models/notification.model';

@Component({
  selector: 'app-show-notification',
  templateUrl: './show-notification.component.html',
  styleUrls: ['./show-notification.component.scss']
})
export class ShowNotificationComponent extends BaseComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ShowNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Notification,
    private authService: AuthService
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

}
