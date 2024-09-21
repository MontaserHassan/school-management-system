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
            icon: 'pi pi-user-plus',
            command: () => {
              this.router.navigate([RoutesUtil.AddUser.url()]);
            }
          }
        ]
      },
      {
        label: 'Subjects',
        icon: 'pi pi-book',
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
        label: 'Students',
        icon: 'pi pi-graduation-cap',
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
