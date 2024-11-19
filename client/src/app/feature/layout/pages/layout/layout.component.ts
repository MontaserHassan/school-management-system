import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../shared/services/general/layout.service';
import { ScreenSizes } from '../../../shared/enums/screen-sizes.enum';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  size!: number
  protected ScreenSizes = ScreenSizes
  constructor(private LayoutService: LayoutService) { }

  ngOnInit() {

    this.size = this.LayoutService.currentScreenWidth
    this.LayoutService.currentScreenWidth$.subscribe((size:any) => {
      this.size = size
    });
  }

}
