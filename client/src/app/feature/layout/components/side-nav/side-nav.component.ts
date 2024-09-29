import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RoutesUtil } from '../../../shared/utils/routes.util';
import { Router } from '@angular/router';
import { UserRoleService } from '../../../shared/services/auth/user-role.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { User } from '../../../shared/models/user.model';
import { RolesConstants } from '../../../shared/config/roles-constants';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  items!: MenuItem[];
  user!: User

  constructor(private router: Router, private userRoleService: UserRoleService) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Users',
        icon: 'pi pi-user',
        visible: this.userRoleService.isUserHasRoles(RolesConstants.ADD_VIEW_List_USER),
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
            icon: 'pi pi-user-plus',
            command: () => {
              this.router.navigate([RoutesUtil.AddUser.url()]);
            }
          },
          {
            label: 'Add Parent',
            icon: 'pi pi-user-plus',
            command: () => {
              this.router.navigate([RoutesUtil.AddParent.url()]);
            }
          }
        ]
      },
      {
        label: 'Subjects',
        icon: 'pi pi-book',
        visible: this.userRoleService.isUserHasRoles(RolesConstants.ADD_VIEW_List_SUBJECT),
        items: [
          {
            label: 'Subjects List',
            icon: 'pi pi-list',
            command: () => {
              this.router.navigate([RoutesUtil.SubjectList.url()]);
            }
          },
          {
            label: 'Add Subject',
            icon: 'pi pi-file-plus',
            command: () => {
              this.router.navigate([RoutesUtil.AddSubject.url()]);
            }
          }
        ]
      },
      {
        label: 'Class Rooms',
        icon: 'pi pi-users',
        visible: this.userRoleService.isUserHasRoles(RolesConstants.ADD_VIEW_List_CLASS_ROOM),
        items: [
          {
            label: 'Class Rooms List',
            icon: 'pi pi-list',
            command: () => {
              this.router.navigate([RoutesUtil.ClassRoomList.url()]);
            }
          },
          {
            label: 'Add Class Room',
            icon: 'pi pi-thumbtack',
            command: () => {
              this.router.navigate([RoutesUtil.AddClassRoom.url()]);
            }
          }
        ]
      },
      {
        label: 'topics',
        icon: 'pi pi-clipboard',
        visible: this.userRoleService.isUserHasRoles(RolesConstants.ADD_VIEW_List_CLASS_ROOM),
        command: () => {
          this.router.navigate([RoutesUtil.TopicsList.url()]);
        }
      },
      {
        label: 'Students',
        icon: 'pi pi-graduation-cap',
        visible: this.userRoleService.isUserHasRoles(RolesConstants.ADD_VIEW_List_STUDENT),
        items: [
          {
            label: 'Students List',
            icon: 'pi pi-list',
            command: () => {
              this.router.navigate([RoutesUtil.StudentList.url()]);
            }
          },
          {
            label: 'Add Student',
            icon: 'pi pi-plus',
            command: () => {
              this.router.navigate([RoutesUtil.AddStudent.url()]);
            }
          }
        ]
      },
      {
        label: 'Schools',
        icon: 'pi pi-building-columns',
        visible: this.userRoleService.isUserHasRoles(RolesConstants.ADD_VIEW_List_SCHOOL),
        items: [
          {
            label: 'Schools List',
            icon: 'pi pi-list',
            command: () => {
              this.router.navigate([RoutesUtil.SchoolList.url()]);
            }
          },
          {
            label: 'Add School',
            icon: 'pi pi-plus',
            command: () => {
              this.router.navigate([RoutesUtil.AddSchool.url()]);
            }
          }
        ]
      },
    ];
  }
}
