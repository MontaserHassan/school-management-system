import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { ClassRoomService } from '../../services/class-room.service';
import { Lookup } from '../../../shared/enums/lookup.enum';

@Component({
  selector: 'app-add-topic-dialog',
  templateUrl: './add-topic-dialog.component.html',
  styleUrls: ['./add-topic-dialog.component.scss']
})
export class AddTopicDialogComponent  extends BaseComponent implements OnInit {
  addTopicForm!: FormGroup;
  protected Lookup = Lookup;

  ngOnInit(): void {
    this.addTopicForm = this.fb.group({
      room: [this.data?.classRoomId ?  {label: this.data?.classRoomId } : '', Validators.required],
      domainId: ["", Validators.required],
      topicName: ['', Validators.required]
    });
  }

  constructor(
    public dialogRef: MatDialogRef<AddTopicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { classRoomId?: string ,addRoom?: boolean },
    private fb: FormBuilder,
    private classRoomService: ClassRoomService
  ) {
    super();
  }

  onSave(): void {
    if (this.addTopicForm.valid) {
      const domainId = this.addTopicForm.get('domainId')?.value.value;
      const room = this.addTopicForm.get('room')?.value.label;
      const payload ={
        ...this.addTopicForm.value,
        room,
        domainId: domainId,
      }
      this.load(this.classRoomService.addTopic(payload), {isLoadingTransparent: true}).subscribe(res => {
        this.dialogRef.close(res);
      })
    }
  }
}
