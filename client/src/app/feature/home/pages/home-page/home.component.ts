import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/component/base-component/base.component';
import * as AOS from 'aos';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent implements OnInit {
  introductionSections = [
    {
      title: this.translate('Schools'),
      supTitle: this.translate('supTitleDirectors'),
      description: this.translate('DirectorsText'),
      image: 'assets/img/directors.png',
    },
    {
      title: this.translate('Educators'),
      supTitle: this.translate('supTitleEducators'),
      description: this.translate('EducatorsText'),
      image: 'assets/img/Educator-Effectiveness.png',
      position: 'left',
    },
    {
      title: this.translate('Parent'),
      supTitle: this.translate('supTitleParent'),
      description: this.translate('ParentText'),
      image: 'assets/img/parents.png',
    }
  ]

  constructor() {
    super()
  }

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
