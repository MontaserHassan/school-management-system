import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { User } from '../../../shared/models/user.model';
import { MenuItem } from 'primeng/api';
import { JwtDecoderService } from '../../../shared/services/auth/jwt-decoder.service';
import { Router } from '@angular/router';
import { RoutesUtil } from '../../../shared/utils/routes.util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser!: any;
  items!: MenuItem[];
  constructor(
    private authService: AuthService, private jwtDecoderService: JwtDecoderService, private router: Router
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUser$.value.user;

    console.log(this.currentUser);

    this.items = [
      {
        label: 'logout',
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
    this.router.navigate([RoutesUtil.UserProfile.url({params: {id: this.currentUser.code}})]);
  }

}
