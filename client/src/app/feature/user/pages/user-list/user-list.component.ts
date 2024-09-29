import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesUtil } from '../../../shared/utils/routes.util';
import { User } from '../../../shared/models/user.model';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends BaseComponent implements OnInit {
  users!:User[]

  constructor(private router:Router, private authService:AuthService) {
    super()
  }

  ngOnInit() {  }

  getUsersList() {
    const params = { page: this.offset, limit: this.pageSize};
    this.load(this.authService.getUsersList(params)).subscribe(res => {
      this.users = res.users || []
      this.totalRowsCount = res.totalDocuments || 1;
      this.pageSize = res?.limit || 0
    })
  }

  viewProfile(user: any) {
    this.router.navigate([RoutesUtil.UserProfile.url({params:{id:user._id}})]);
  }


  paginate(event: any): void {
    this.offset =  event.first / event.rows + 1;
    this.pageSize = event.rows;
    this.getUsersList();
  }
}
