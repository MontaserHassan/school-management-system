import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { ParentService } from '../../service/parent.service';
import { Router } from '@angular/router';
import { RoutesUtil } from '../../../shared/utils/routes.util';

@Component({
  selector: 'app-add-parent',
  templateUrl: './add-parent.component.html',
  styleUrls: ['./add-parent.component.scss']
})
export class AddParentComponent extends BaseComponent implements OnInit {
  parentForm: FormGroup;

  protected RoutesUtil = RoutesUtil

  constructor(private fb: FormBuilder ,private parentService: ParentService, private router:Router) {
    super();
    this.parentForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      students: this.fb.array([this.createStudent()])
    });
  }

  ngOnInit(): void {

  }

  get students(): FormArray {
    return this.parentForm.get('students') as FormArray;
  }

  createStudent(): FormGroup {
    return this.fb.group({
      studentName: ['', Validators.required],
      media: ['']
    });
  }

  addStudent() {
    this.students.push(this.createStudent());
  }

  removeStudent(index: number) {
    if (this.students.length > 1) {
      this.students.removeAt(index);
    }
  }

  onFileSelect(event: any, index: number) {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.students.at(index).patchValue({ media: reader.result });
      };
    }
  }

  submitForm() {
    if (this.parentForm.valid) {
      const parentData = this.parentForm.value;
      this.load(this.parentService.addParent(parentData)).subscribe(res => {
        this.router.navigate([RoutesUtil.UserProfile.url({ params: { id: res.user?._id } })]);
      });
    }
  }
}
