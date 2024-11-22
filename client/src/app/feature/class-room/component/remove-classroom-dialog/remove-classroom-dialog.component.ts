import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { ClassRoomService } from '../../services/class-room.service';

@Component({
  selector: 'app-remove-classroom-dialog',
  templateUrl: './remove-classroom-dialog.component.html',
  styleUrls: ['./remove-classroom-dialog.component.scss']
})
export class RemoveClassroomDialogComponent extends BaseComponent {

  constructor(
    private dialogRef: MatDialogRef<RemoveClassroomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {roomId:string},
    private classRoomService: ClassRoomService
  ) {
    super();
  }

  confirm(): void {
    console.log(this.data.roomId);

    this.load(
      this.classRoomService.removeClassRoom(this.data.roomId),
      {isLoadingTransparent:true}
    ).subscribe(res => {
      this.dialogRef.close(true);
    }
    )
  }
}
