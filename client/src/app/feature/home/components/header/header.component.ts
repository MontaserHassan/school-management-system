import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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
