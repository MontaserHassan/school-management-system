import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Domain } from '../../models/domain.model';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { DomainService } from '../../services/domain.service';
import { MenuItem } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { EditDomainDialogComponent } from '../../components/edit-domain-dialog/edit-domain-dialog.component';

@Component({
  selector: 'app-domain-view',
  templateUrl: './domain-view.component.html',
  styleUrls: ['./domain-view.component.scss']
})
export class DomainViewComponent extends BaseComponent implements OnInit {
  id?: string;
  domain:Domain = new Domain();
  domainAction!:MenuItem[]

  constructor(private activatedRoute: ActivatedRoute,private domainService:DomainService, private dialog: MatDialog) {
    super()
  }

  ngOnInit() {
    this.id =  this.activatedRoute.snapshot.params?.['id'];
    this.getDomainById()
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
            label: this.translate('edit'),
            icon: 'pi pi-pencil'
          },
        ]
      }
    ];
  }
  getDomainById() {
    this.load(this.domainService.getDomainById(this.id || ""), { isLoadingTransparent: true }).subscribe(domain => {
      this.domain = domain;
    })
  }

  handleClick(label: string): void {
    if (!this.domainAction.length) {
      return
    }
    if (label === this.domainAction?.[0]?.items?.[0]?.label) {
      const dialog = this.dialog.open(EditDomainDialogComponent, {
        data: { domain : this.domain },
      })

      dialog.afterClosed().subscribe(res => {
        if (res) {
          this.getDomainById()
        }
      })
    }
  }
}
