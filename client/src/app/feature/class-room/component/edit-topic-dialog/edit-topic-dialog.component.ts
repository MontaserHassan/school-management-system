import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClassRoomService } from '../../services/class-room.service';
import { Topic } from '../../models/topic.model';

@Component({
  selector: 'app-edit-topic-dialog',
  templateUrl: './edit-topic-dialog.component.html',
  styleUrls: ['./edit-topic-dialog.component.scss']
})
export class EditTopicDialogComponent extends BaseComponent {
  topicForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditTopicDialogComponent>,
    private classRoomService: ClassRoomService,
    @Inject(MAT_DIALOG_DATA) public data: { topic:Topic }
  ) {
    super();
    this.topicForm = this.fb.group({
      topicName: [data.topic.topicName || "", [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit(): void {
    if (this.topicForm.valid) {
      const payload = {
        topicName: this.topicForm.value.topicName,
        topicId: this.data.topic._id || ""
      }
      this.load(this.classRoomService.editTopic(payload)).subscribe(res => {
        this.dialogRef.close(res);
      })
    }
  }
}
