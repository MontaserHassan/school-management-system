import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home.routes';
import { HomeComponent } from './pages/home-page/home.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServicesSectionComponent } from './components/services-section/services-section.component';
import { IntroductionSectionComponent } from './components/introduction-section/introduction-section.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthComponent } from './pages/auth/auth.component';

@NgModule({
  declarations: [
    HomeComponent,
    ServicesSectionComponent,
    IntroductionSectionComponent,
    NavBarComponent,
    HeaderComponent,
    FooterComponent,
    AuthComponent,
    LoginFormComponent,
  ],
  imports: [
    CommonModule, SharedModule, HomeRoutingModule,
  ],
})
export class HomeModule { }
