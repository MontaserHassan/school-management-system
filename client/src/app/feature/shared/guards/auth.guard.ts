import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { RoutesUtil } from '../utils/routes.util';
import { AuthService } from '../services/auth/auth.service';
import { UserRoleService } from '../services/auth/user-role.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.authService.isLoggedIn()) {
      if (state.url.indexOf(RoutesUtil.AuthLogin.path) > 0) {
        this.router.navigate([RoutesUtil.Dashboard.url()]);
      }
      return true;
    }
    this.authService.redirectionURL = state.url;
    this.router.navigate([RoutesUtil.AuthLogin.url()]);
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.authService.isLoggedIn()) {
       if (state.url.indexOf(RoutesUtil.AuthLogin.path) > 0) {
        this.router.navigate([RoutesUtil.Dashboard.url()]);
      }
      return true;
    }
    this.authService.redirectionURL = state.url;
    this.router.navigate([RoutesUtil.AuthLogin.url()]);
    return false;
  }

  constructor(private authService: AuthService, private router: Router, private userRoleService: UserRoleService) {}
}
