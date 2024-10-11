import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Notification } from '../../models/notification.model';
import { OverlayPanel } from 'primeng/overlaypanel';
import { MatDialog } from '@angular/material/dialog';
import { ShowNotificationComponent } from '../show-notification/show-notification.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent extends BaseComponent implements OnInit {
  @ViewChild('notificationPanel') notificationPanel: OverlayPanel | undefined;

  notifications: Notification[] = [];
  unreadCount: number = 0;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit() {
    this.getAllNotifications()
  }

  toggleNotifications(event: Event) {
    this.notificationPanel?.toggle(event);
  }

  updateUnreadCount(): void {
    this.unreadCount = this.notifications.filter(n => !n.read).length;
  }

  markAsRead(notification: any) {
    notification.read = true;
    this.unreadCount = this.notifications.filter(n => !n.read).length;

    this.notificationPanel?.hide()
    this.dialog.open(ShowNotificationComponent, {
      width: '400px',
      data: notification
    });
  }

  markAllAsRead() {
    this.load(
      this.authService.markAllAsRead(), {
        isLoadingTransparent: true
      }
    ).subscribe( () => {
        this.notifications.forEach(notification => (notification.read = true));
        this.unreadCount = 0;
      }
    )
  }

  isLast(notification: any): boolean {
    return this.notifications.indexOf(notification) === this.notifications.length - 1;
  }

  getAllNotifications() {
    this.load(
      this.authService.getAllNotifications(), {
      isLoadingTransparent: true
    }
    ).subscribe((res) => {
      this.notifications = res.notifications;
      this.updateUnreadCount();
    }
    )
  }
}
