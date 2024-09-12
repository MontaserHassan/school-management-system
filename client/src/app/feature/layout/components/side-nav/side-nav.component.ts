import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  items!: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        label: 'Router',
        icon: 'pi pi-palette',
        items: [
          {
            label: 'Installation',
            icon: 'pi pi-eraser',
          },
          {
            label: 'Configuration',
            icon: 'pi pi-heart',
          }
        ]
      },
      {
        label: 'Programmatic',
        icon: 'pi pi-link',
      },
      {
        label: 'External',
        icon: 'pi pi-home',
        items: [
          {
            label: 'Angular',
            icon: 'pi pi-star',
          },
          {
            label: 'Vite.js',
            icon: 'pi pi-bookmark',
          }
        ]
      }
    ];
  }
}
