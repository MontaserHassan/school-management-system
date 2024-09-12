import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { LayoutComponent } from './pages/layout/layout.component';


@NgModule({
  declarations: [
    SideNavComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule, SharedModule,
  ],
})
export class layoutModule { }
