import { Component, Input, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-introduction-section',
  templateUrl: './introduction-section.component.html',
  styleUrls: ['./introduction-section.component.scss']
})
export class IntroductionSectionComponent implements OnInit {
  @Input() data?:{
    title:string,
    supTitle?:string,
    description:string,
    image:string,
    position?:string
  }

  constructor() { }

   ngOnInit() {
    AOS.init({
      duration: 750,
      delay: 150,
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      AOS.refresh()
    },100)
  }
}
