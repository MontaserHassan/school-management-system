import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import e from 'express';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { ClassRoomService } from '../../services/class-room.service';

@Component({
  selector: 'app-leave-student-dialog',
  templateUrl: './leave-student-dialog.component.html',
  styleUrls: ['./leave-student-dialog.component.scss']
})
export class LeaveStudentDialogComponent extends BaseComponent{

  constructor(
    private dialogRef: MatDialogRef<LeaveStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {studentId:string , roomId:string},
    private classRoomService: ClassRoomService
  ) {
    super();
  }

  confirm(): void {
    this.load(this.classRoomService.deleteStudentFromClassRoom(this.data),{isLoadingTransparent:true}).subscribe(res=>{
      this.dialogRef.close(true);
    })
  }
}
