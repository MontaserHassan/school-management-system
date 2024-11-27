import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lookup } from '../../../shared/enums/lookup.enum';
import { take } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { SocialService } from '../../services/social.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss'
})
export class AddEventComponent extends BaseComponent {
  addEventForm!: FormGroup;
  roles: string[] = [ 'all', 'parent', 'director', 'teacher', 'superAdmin',];
  lookUpExtraParams = {}
  protected Lookup = Lookup
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEventComponent>,
    private socialService: SocialService
  ) {
    super();

    // Initialize the form
    this.initForm()
  }

  initForm() {
    this.addEventForm = this.fb.group({
      eventName: ['', Validators.required],
      description: ['', Validators.required],
      membersId: [[], Validators.required],
      date: [null, Validators.required],
      role: ['all'],
    });

    this.addEventForm.get('role')?.valueChanges.pipe(take(200)).subscribe((value) => {
      if (value) {
        this.addEventForm.get('receiverIds')?.setValue([]);
        if (value === 'all') {
          this.lookUpExtraParams = {};
          return
        }
        this.lookUpExtraParams = { role: value };
      }
    });
  }

  onSave() {
    if (this.addEventForm.valid) {
      const {eventName, description, membersId, date} = this.addEventForm.value;

      const eventData = {
        eventName,
        description,
        membersId:membersId.map((item: any) => item.value),
        date
      }

    this.load(
        this.socialService.addEvent(eventData),
        {isLoadingTransparent: true}
      ).subscribe((res) => {
        this.dialogRef.close(true)
      })
    }
  }
}
