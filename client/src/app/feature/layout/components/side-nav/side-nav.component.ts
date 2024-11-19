import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RoutesUtil } from '../../../shared/utils/routes.util';
import { Router } from '@angular/router';
import { UserRoleService } from '../../../shared/services/auth/user-role.service';
import { User } from '../../../shared/models/user.model';
import { RolesConstants } from '../../../shared/config/roles-constants';
import { BaseComponent } from '../../../shared/component/base-component/base.component';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent extends BaseComponent implements OnInit {
  items!: MenuItem[];
  user!: User;

  constructor(private router: Router, private userRoleService: UserRoleService) {
    super();
  }

  ngOnInit() {
    this.generateMenu();
  }

  protected override onLanguageChange(): void {
    this.generateMenu();
  }

  generateMenu() {
    this.items = [
      {
        label: this.translate('Users'),
        icon: 'pi pi-user',
        visible: this.userRoleService.isUserHasRoles(RolesConstants.ADD_VIEW_List_USER),
        items: [
          {
            label: this.translate('UsersList'),
            icon: 'pi pi-list',
            command: () => {
              this.router.navigate([RoutesUtil.UserList.url()]);
            }
          },
          {
            label: this.translate('AddUser'),
            icon: 'pi pi-user-plus',
            command: () => {
              this.router.navigate([RoutesUtil.AddUser.url()]);
            }
          },
          {
            label: this.translate('AddParent'),
            icon: 'pi pi-user-plus',
            command: () => {
              this.router.navigate([RoutesUtil.AddParent.url()]);
            }
          }
        ]
      },
      {
        label: this.translate('Domains'),
        icon: 'pi pi-book',
        visible: this.userRoleService.isUserHasRoles(RolesConstants.ADD_VIEW_List_DOMAIN),
        items: [
          {
            label: this.translate('DomainsList'),
            icon: 'pi pi-list',
            command: () => {
              this.router.navigate([RoutesUtil.DomainList.url()]);
            }
          },
          {
            label: this.translate('AddDomain'),
            icon: 'pi pi-file-plus',
            command: () => {
              this.router.navigate([RoutesUtil.AddDomain.url()]);
            }
          }
        ]
      },
      {
        label: this.translate('ClassRooms'),
        icon: 'pi pi-users',
        visible: this.userRoleService.isUserHasRoles(RolesConstants.VIEW_List_CLASS_ROOM),
        items: [
          {
            label: this.translate('ClassRoomsList'),
            icon: 'pi pi-list',
            command: () => {
              this.router.navigate([RoutesUtil.ClassRoomList.url()]);
            }
          },
          {
            label: this.translate('AddClassRoom'),
            icon: 'pi pi-thumbtack',
            visible: this.userRoleService.isUserHasRoles(RolesConstants.ADD_CLASS_ROOM),
            command: () => {
              this.router.navigate([RoutesUtil.AddClassRoom.url()]);
            }
          }
        ]
      },
      {
        label: this.translate('Skills'),
        icon: 'pi pi-clipboard',
        visible: this.userRoleService.isUserHasRoles(RolesConstants.VIEW_SKILL),
        command: () => {
          this.router.navigate([RoutesUtil.SkillsList.url()]);
        }
      },
      {
        label: this.translate('Students'),
        icon: 'pi pi-graduation-cap',
        visible: this.userRoleService.isUserHasRoles(RolesConstants.VIEW_List_STUDENT),
        items: [
          {
            label: this.translate('StudentsList'),
            icon: 'pi pi-list',
            command: () => {
              this.router.navigate([RoutesUtil.StudentList.url()]);
            }
          },
          {
            label: this.translate('AddStudent'),
            icon: 'pi pi-plus',
            visible: this.userRoleService.isUserHasRoles(RolesConstants.ADD_STUDENT),
            command: () => {
              this.router.navigate([RoutesUtil.AddStudent.url()]);
            }
          }
        ]
      },
      {
        label: this.translate('Schools'),
        icon: 'pi pi-building-columns',
        visible: this.userRoleService.isUserHasRoles(RolesConstants.ADD_VIEW_List_SCHOOL),
        items: [
          {
            label: this.translate('SchoolsList'),
            icon: 'pi pi-list',
            command: () => {
              this.router.navigate([RoutesUtil.SchoolList.url()]);
            }
          },
          {
            label: this.translate('AddSchool'),
            icon: 'pi pi-plus',
            command: () => {
              this.router.navigate([RoutesUtil.AddSchool.url()]);
            }
          }
        ]
      },
      {
        label: this.translate('Invoices'),
        icon: 'pi pi-receipt',
        visible: this.userRoleService.isUserHasRoles(RolesConstants.ADD_VIEW_INVOICE_SCHOOL),
        command: () => {
          this.router.navigate([RoutesUtil.SchoolInvoiceList.url()]);
        }
      },
      {
        label: this.translate('Invoices'),
        icon: 'pi pi-receipt',
        visible: this.userRoleService.isUserHasRoles(RolesConstants.VIEW_INVOICE_STUDENT),
        command: () => {
          this.router.navigate([RoutesUtil.StudentInvoiceList.url()]);
        }
      },
      {
        label: this.translate('SendEmail'),
        icon: 'pi pi-envelope',
        visible: this.userRoleService.isUserHasRoles(RolesConstants.SEND_EMAILS),
        command: () => {
          this.router.navigate([RoutesUtil.SocialEmail.url()]);
        }
      },
      {
        label: this.translate('Tickets'),
        icon: 'pi pi-comments',
        command: () => {
          this.router.navigate([RoutesUtil.SocialTicket.url()]);
        }
      },
    ];
  }
}
