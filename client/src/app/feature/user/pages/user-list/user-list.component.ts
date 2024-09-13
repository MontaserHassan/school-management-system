import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users = [
    {
      _id: '1',
      userName: 'superAdmin',
      email: 'superadmin@gmail.com',
      role: 'superAdmin',
      lastSeen: '2024-09-13T20:05:23.975Z',
      code: 'O9635'
    },
    {
      _id: '2',
      userName: 'user1',
      email: 'user1@gmail.com',
      role: 'admin',
      lastSeen: '2024-09-13T19:00:23.975Z',
      code: 'O9636'
    },
    {
      _id: '3',
      userName: 'user2',
      email: 'user2@gmail.com',
      role: 'user',
      lastSeen: '2024-09-13T18:30:23.975Z',
      code: 'O9637'
    }
  ];

  constructor(private router:Router) { }

  ngOnInit() {
  }


   viewProfile(user: any) {
    this.router.navigate(['/user-profile', user._id]); // Redirect to the profile page
  }
}
