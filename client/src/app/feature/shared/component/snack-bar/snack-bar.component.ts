import { Component, Inject } from '@angular/core';
import { LayoutService } from '../../services/general/layout.service';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})

export class SnackBarComponent {
  constructor(
    public layoutService: LayoutService,
    public snackBarRef: MatSnackBarRef<SnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
  ) {
  }
}
