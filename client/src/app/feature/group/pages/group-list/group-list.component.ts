import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { Group } from '../../models/group.model';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent extends BaseComponent implements OnInit {
  groups!:Group[]

  constructor(
    private groupService: GroupService,
  ) {
    super();
  }

  ngOnInit() {
    this.getGroups()
  }

  getGroups() {
    this.load(this.groupService.getGroups({offset: this.offset, limit: this.pageSize})).subscribe(groups => {
      this.groups = groups.groups || [];
      this.totalRowsCount = groups.totalDocuments || 1;
      this.pageSize = groups?.limit || 10
    })
  }

  getClassesForGroup(group:Group): void {
    if(!group?.classes) {
      this.load(this.groupService.getClassesForGroup(group?._id || '')).subscribe(classes => {
        group.classes = classes || [];
      })
    }
  }

  paginate(event: any): void {
    this.offset = event.first / event.rows + 1;
    this.pageSize = event.rows;
    this.getGroups()
  }
}
