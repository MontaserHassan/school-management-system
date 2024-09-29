import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { Lookup } from '../../../shared/enums/lookup.enum';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { RoutesUtil } from '../../../shared/utils/routes.util';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent extends BaseComponent implements OnInit {
  studentForm!: FormGroup;
  protected lookup = Lookup;

  constructor(private fb: FormBuilder, private studentService: StudentService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      studentName: ['', Validators.required],
      parentId: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const { studentName, parentId } = this.studentForm.value;
      const payload = {
        studentName,
        parentId: parentId.value
      }

      this.load(this.studentService.addStudent({students:[payload]}),{isLoadingTransparent:true}).subscribe(res=>{
        this.router.navigate([RoutesUtil.StudentView.url({params:{id:res[0]._id}})]);
      })
    }
  }
}
