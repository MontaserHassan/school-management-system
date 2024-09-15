import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { User } from '../../../shared/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent extends BaseComponent implements OnInit {
  currentUser!: User | undefined;

  constructor(private authService: AuthService, private activeRoute: ActivatedRoute) {
    super()
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      const id = params?.['id']

      this.getUserProfile()
    })

  }

  getUserProfile() {
    // this.load(this.authService.getUserProfile(this.currentUser?._id))
  }

}
