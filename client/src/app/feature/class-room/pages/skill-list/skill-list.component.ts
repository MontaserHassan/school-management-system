import { Component, OnInit } from '@angular/core';
import { AddSkillDialogComponent } from '../../component/add-skill-dialog/add-skill-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Skill } from '../../models/skill.model';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { ClassRoomService } from '../../services/class-room.service';
import { MenuItem } from 'primeng/api';
import { EditSkillDialogComponent } from '../../component/edit-skill-dialog/edit-skill-dialog.component';
import { RolesConstants } from '../../../shared/config/roles-constants';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss']
})
export class SkillListComponent extends BaseComponent implements OnInit {
  skills!: Skill[]
  skillAction!:MenuItem[]
  protected RolesConstants = RolesConstants

  constructor(private dialog: MatDialog, private classRoomService: ClassRoomService) {
    super();
  }

  ngOnInit(): void {
    this.getSkills();
    this.generateMenu();
  }

  protected override onLanguageChange(): void {
    this.generateMenu();
  }

  generateMenu(): void {
    this.skillAction = [
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

  getSkills(): void {
    const params = { page: this.offset.toString(), limit: this.pageSize.toString() };

    this.load(this.classRoomService.getSkills(params), { isLoadingTransparent: true }).subscribe((response) => {
      this.skills = response.skills || [];
      this.totalRowsCount = response.totalDocuments || 1;
      this.pageSize = response?.limit || this.pageSize
    })
  }

  openAddSkillDialog(): void {
    const dialogRef = this.dialog.open(AddSkillDialogComponent, {
      width: '400px',
      data: { addRoom: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getSkills()
      }
    });
  }

  paginate(event: any): void {
    this.offset = event.page + 1;
    this.pageSize = event.rows;
    this.getSkills();
  }

  handleClick(label: string, skill: Skill) {
    if (!this.skillAction.length) {
      return
    }
    if (label === this.skillAction?.[0]?.items?.[0]?.label) {
      const dialog = this.dialog.open(EditSkillDialogComponent, {
        data: { skill }
      })

      dialog.afterClosed().subscribe(res => {
        if (res) {
          this.getSkills()
        }
      })
    }
  }
}
