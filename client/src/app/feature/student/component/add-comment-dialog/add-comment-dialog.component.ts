import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-add-comment-dialog',
  templateUrl: './add-comment-dialog.component.html',
  styleUrls: ['./add-comment-dialog.component.scss']
})
export class AddCommentDialogComponent extends BaseComponent implements OnInit {
   commentForm: FormGroup;
  uploadedFiles: File[] = [];
  base64Files: string[] = []; // Array to hold Base64 strings

  constructor(
    public dialogRef: MatDialogRef<AddCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private studentService: StudentService
  ) {
    super();
    this.commentForm = this.fb.group({
      comment: ['', Validators.required],
      media: [null],
    });
  }

  ngOnInit(): void {}

  onUpload(event: any) {
    this.uploadedFiles = [];

    for (let file of event.files) {
      this.uploadedFiles.push(file);
      this.convertToBase64(file);
    }
  }

  clear(event:any){
    this.uploadedFiles = [];
    this.base64Files = [];
  }

  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64Files.push(reader.result as string);
    };
  }

  addComment() {
    if (this.commentForm.valid) {
      const commentData = {
        ...this.commentForm.value,
        studentId: this.data.studentId,
        media: this.base64Files[0],
      };

      this.load(this.studentService.addComment(commentData), { isLoadingTransparent: true }).subscribe((res) => {
        this.dialogRef.close(res);
      })
    }
  }

}
