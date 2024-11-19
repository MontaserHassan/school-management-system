import { Component, OnInit } from '@angular/core';
import { Domain } from '../../models/domain.model';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { DomainService } from '../../services/domain.service';
import { Router } from '@angular/router';
import { RoutesUtil } from '../../../shared/utils/routes.util';
import { MenuItem } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { EditDomainDialogComponent } from '../../components/edit-domain-dialog/edit-domain-dialog.component';

@Component({
  selector: 'app-domain-list',
  templateUrl: './domain-list.component.html',
  styleUrls: ['./domain-list.component.scss']
})
export class DomainListComponent extends BaseComponent implements OnInit {
  domains!: Domain[]
  domainAction!:MenuItem[]

  constructor(private domainService: DomainService, private router: Router ,private dialog: MatDialog) {
    super()
  }

  ngOnInit() {
    this.getDomains()
    this.generateMenu()
  }

  protected override onLanguageChange(): void {
    this.generateMenu();
  }
  generateMenu() {
    this.domainAction = [
      {
        label: this.translate('actions'),
        items: [
          {
            label: this.translate('viewDomain'),
            icon: 'pi pi-book',
          },
          {
            label: this.translate('edit'),
            icon: 'pi pi-pencil'
          },
        ]
      }
    ];
  }

  getDomains() {
    const params = { page: this.offset, limit: this.pageSize};
    this.load(this.domainService.getDomains(params), { isLoadingTransparent: true }).subscribe(domains => {
      this.domains = domains.domain || [];
      this.totalRowsCount = domains.totalDocuments || 1;
      this.pageSize = domains?.limit || 0

    })
  }

  viewDomain(id: string): void {
    this.router.navigate([RoutesUtil.DomainView.url({ params: { id } })]);
  }

  paginate(event: any): void {
    this.offset = event.first / event.rows + 1;
    this.pageSize = event.rows;
    this.getDomains()
  }

  handleClick(label: string, domain: Domain): void {
    if (!this.domainAction.length) {
      return
    }
    if (label === this.domainAction?.[0]?.items?.[0]?.label) {
      this.viewDomain(domain._id || "")
    }
    else if (label === this.domainAction?.[0]?.items?.[1]?.label) {
      const dialog = this.dialog.open(EditDomainDialogComponent, {
        data: { domain }
      })

      dialog.afterClosed().subscribe(res => {
        if (res) {
          this.getDomains()
        }
      })
    }
  }
}
