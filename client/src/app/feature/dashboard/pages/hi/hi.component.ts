import { Component, OnInit } from '@angular/core';
import { SectionStateStatus } from '../../../shared/enums/section-state-status.enum';

@Component({
  selector: 'app-hi',
  templateUrl: './hi.component.html',
  styleUrls: ['./hi.component.css']
})
export class HiComponent implements OnInit {
  sectionState = SectionStateStatus.Empty
  constructor() { }

  ngOnInit() {
  }

  clickMe() {
    if (this.sectionState === SectionStateStatus.LoadingTransparent) {
      this.sectionState = SectionStateStatus.Ready
    }else{
      this.sectionState = SectionStateStatus.LoadingTransparent
    }
  }
}
