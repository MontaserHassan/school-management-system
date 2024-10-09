import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { User } from '../../../shared/models/user.model';
import { MenuItem } from 'primeng/api';
import { JwtDecoderService } from '../../../shared/services/auth/jwt-decoder.service';
import { Router } from '@angular/router';
import { RoutesUtil } from '../../../shared/utils/routes.util';
import { LayoutService } from '../../../shared/services/general/layout.service';
import { ScreenSizes } from '../../../shared/enums/screen-sizes.enum';
import { BaseComponent } from '../../../shared/component/base-component/base.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent implements OnInit {
  currentUser!: any;
  items!: MenuItem[];
  size!: number;
  sidebarVisible: boolean = false;


  protected ScreenSizes = ScreenSizes
  constructor(
    private authService: AuthService, private jwtDecoderService: JwtDecoderService, private router: Router, private LayoutService:LayoutService
  ) {
    super();
  }

  ngOnInit() {
      this.size = this.LayoutService.currentScreenWidth
    this.LayoutService.currentScreenWidth$.subscribe((size) => {
      this.size = size
    });

    this.currentUser = this.authService.currentUser$.value.user;

    this.generateMenuItems()
  }

  generateMenuItems() {
    this.items = [
      {
        label: 'logout' ,
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        }
      },
    ];
  }

  logout() {
    this.jwtDecoderService.removeCurrentToken();
    this.router.navigate([RoutesUtil.AuthLogin.url()]);
  }

  goToUserProfile() {
    this.router.navigate([RoutesUtil.UserProfile.url({params: {id: this.currentUser._id}})]);
  }
}
