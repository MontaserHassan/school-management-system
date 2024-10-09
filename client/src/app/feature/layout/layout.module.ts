import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ShowNotificationComponent } from './components/show-notification/show-notification.component';


@NgModule({
  declarations: [
    SideNavComponent,
    LayoutComponent,
    HeaderComponent,
    NotificationComponent,
    ShowNotificationComponent
  ],
  imports: [
    CommonModule, SharedModule,
  ],
})
export class layoutModule { }
