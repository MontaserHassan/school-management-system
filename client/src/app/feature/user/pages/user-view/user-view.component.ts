import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { User } from '../../../shared/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { Student } from '../../../student/models/student.model';
import { ParentService } from '../../service/parent.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent extends BaseComponent implements OnInit {
  currentUser!: User | undefined;
  students!:Student[]

  constructor(private authService: AuthService, private activeRoute: ActivatedRoute ,private parentService: ParentService) {
    super()
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      const id = params?.['id']
      this.getUserProfile(id)
    })

  }

  getUserProfile(id: string) {
    this.load(
      this.authService.getUserProfile(id).pipe(
        switchMap((res) => {
          this.currentUser = res;
          
          if (res.role === 'parent') {
            return this.parentService.getStudentByParentId(id).pipe(
              map((students) => {
                this.students = students;
                return res;
              })
            );
          }

          return of(res);
        })
      ),
      { isLoadingTransparent: true }
    ).subscribe((res) => {
      this.currentUser = res;
    });
  }
}
