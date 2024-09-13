import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RoutesUtil } from '../../../shared/utils/routes.util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  items!: MenuItem[];

  constructor(private router:Router) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Users',
        icon: 'pi pi-user',
        items: [
          {
            label: 'Users List',
            icon: 'pi pi-list',
            command: () => {
              this.router.navigate([RoutesUtil.UserList.url()]);
            }
          },
          {
            label: 'Add User',
            icon: 'pi pi-user-edit',
            command: () => {
              this.router.navigate([RoutesUtil.AddUser.url()]);
            }
          }
        ]
      },
    ];
  }
}
