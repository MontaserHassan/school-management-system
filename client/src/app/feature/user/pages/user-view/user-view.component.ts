import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { User } from '../../../shared/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { Student } from '../../../student/models/student.model';
import { ParentService } from '../../service/parent.service';
import { MenuItem, MessageService } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserDialogComponent } from '../../component/update-user-dialog/update-user-dialog.component';
import { ResetPasswordConfirmationDialogComponent } from '../../../shared/component/reset-password-confirmation-dialog/reset-password-confirmation-dialog.component';
import { RoutesUtil } from '../../../shared/utils/routes.util';
import { RolesConstants } from '../../../shared/config/roles-constants';
import { UserRole } from '../../../shared/enums/user-role.enum';
import { InvoiceService } from '../../../invoice/service/invoice.service';
import { Invoice } from '../../../invoice/models/invoice.model';
import { MediaPreviewDialogComponent } from '../../../shared/component/media-preview-dialog/media-preview-dialog.component';
import { PaymentResultDialogComponent } from '../../../shared/component/payment-result-dialog/payment-result-dialog.component';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent extends BaseComponent implements OnInit {
  currentUser!: User | undefined;
  students!: Student[]
  invoices!: Invoice[]
  userActions: MenuItem[] = [];
  id!: string
  protected RolesConstants = RolesConstants
  protected UserRole = UserRole

  constructor(
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private parentService: ParentService,
    private invoiceService:InvoiceService,
    private matDialog: MatDialog,
    private router: Router,
  ) {
    super()
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.id = params?.['id']
      this.getUserProfile(this.id)
    })

    this.activeRoute.queryParams.subscribe(params => {
      if (params?.['isSuccess']) {
        setTimeout(() => {
          const dialog = this.matDialog.open(PaymentResultDialogComponent,{
            data: {
              isSuccess: params?.['isSuccess'] === "true"
            }
          })
        }, 1000)
      }
    })

    this.generateMenu();
  }

  protected override onLanguageChange(): void {
    this.generateMenu();
  }

  generateMenu() {
    this.userActions = [
      {
        label: this.translate('actions'),
        items: [
          {
            label: this.translate('edit'),
            icon: 'pi pi-pencil',
          },
          {
            label: this.translate('resetPassword'),
            icon: 'pi pi-spin pi-cog',
          }
        ]
      }
    ]
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
          } else if(res.role === 'admin'){
            const params = { page: this.offset, limit: this.pageSize};

            return this.invoiceService.getSchoolInvoices(params).pipe(
              map((invoices) => {
                this.totalRowsCount = invoices?.totalDocuments || 1;
                this.pageSize = invoices?.limit || this.pageSize
                this.invoices = invoices.invoices;
                return res;
              })
            )
          }
          return of(res);
        })
      ),
      { isLoadingTransparent: true }
    ).subscribe((res) => {
      this.currentUser = res;
    });
  }

  gotoStudentDetails(studentId: string) {
    this.router.navigate([RoutesUtil.StudentView.url({ params: { id: studentId } })])
  }

  handleClick(label: string) {
    if (!this.userActions.length) {
      return
    }
    if (label === this.userActions?.[0]?.items?.[0]?.label) {
      const dialog = this.matDialog.open(UpdateUserDialogComponent, {
        data: { user: this.currentUser }
      })

      dialog.afterClosed().subscribe(res => {
        if (res) {
          this.getUserProfile(this.id)
        }
      })
    }
    else if (label === this.userActions?.[0]?.items?.[1]?.label) {
      const dialog = this.matDialog.open(ResetPasswordConfirmationDialogComponent, {
        data: { user: this.currentUser }
      })

      dialog.afterClosed().subscribe(res => {
        if (res) {
          this.getUserProfile(this.id)
        }
      })
    }
  }

  navigateToSchoolDetails(id: string): void {
    this.router.navigate([RoutesUtil.SchoolView.url({ params: { id } })]);
  }

  openMediaDialog(file: any) {
    this.matDialog.open(MediaPreviewDialogComponent, {
      data: file,
      width: '80%'
    });
  }

  paginate(event: any): void {
    this.offset =  event.first / event.rows + 1;
    this.pageSize = event.rows;
    this.getUserProfile(this.id)
  }

  createPayment(invoiceId: string) {
    this.load(
      this.invoiceService.createPayment({ invoiceId }),
      { isLoadingTransparent: true }
    ).subscribe((res) => {
      window.location.href = res.redirectURL
    });
  }
}



