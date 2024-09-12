import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { RoutesUtil } from '../../../shared/utils/routes.util';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent extends BaseComponent implements OnInit {
  items!: MenuItem[];
  protected RoutesUtil = RoutesUtil
  constructor(private router:Router) {
    super()
  }

  ngOnInit() {
    this.generateMenu();
  }

  protected override onLanguageChange(): void {
    this.generateMenu();
  }

  generateMenu(){
    this.items = [
      {
        label:  this.translate('Home'),
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label:  this.translate('AboutUs'),
        icon: 'pi pi-info-circle',
        command:()=> this.router.navigate([this.RoutesUtil.Home.path], { fragment: 'about' })
      },
      {
        label:  this.translate('OurServices'),
        icon: 'pi pi-list',
        command:()=> this.router.navigate([this.RoutesUtil.Home.path], { fragment: 'services' })

      },
      {
        label:  this.translate('Login'),
        icon: 'pi pi-sign-in',
        routerLink:this.RoutesUtil.AuthLogin.url(),
        // command:()=> this.router.navigate([this.RoutesUtil.AuthLogin.url()])
      }
    ];
  }

  goToHome(){
    this.router.navigate([this.RoutesUtil.Home.path])
  }
}
