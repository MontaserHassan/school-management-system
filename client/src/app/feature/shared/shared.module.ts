import { Input, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenuModule } from 'primeng/menu';
import { ChangeLanguageButtonComponent } from './component/change-language-button/change-language-button.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarComponent } from './component/snack-bar/snack-bar.component';
import { StateSectionComponent } from './component/state-section/state-section.component';
import { LoaderComponent } from './component/loader/loader.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DividerModule } from 'primeng/divider';
import { ChipsModule } from 'primeng/chips';
import { SidebarModule } from 'primeng/sidebar';
import { AccordionModule } from 'primeng/accordion';
import { ChipModule } from 'primeng/chip';
import { TabViewModule } from 'primeng/tabview';
import { TimelineModule } from 'primeng/timeline';
import { LazyDropdownComponent } from './component/lazy-dropdown/lazy-dropdown.component';
import { CalendarModule } from 'primeng/calendar';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const COMPONENT =[
  ChangeLanguageButtonComponent,
  SnackBarComponent,
  StateSectionComponent,
  LoaderComponent,
  LazyDropdownComponent
]

const MATERIAL_MODULES = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatPaginatorModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatRippleModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
]

const PRIME_NG_MODULES = [
  ButtonModule,
  SplitButtonModule,
  ToastModule,
  TieredMenuModule,
  MenuModule,
  MenubarModule,
  PanelModule,
  CardModule,
  MessageModule,
  PasswordModule,
  ProgressSpinnerModule,
  PanelMenuModule,
  BadgeModule,
  RippleModule,
  AvatarModule,
  TableModule,
  DropdownModule,
  InputTextModule,
  TagModule,
  MultiSelectModule,
  DividerModule,
  CalendarModule,
  ChipsModule,
  SidebarModule,
  AccordionModule,
  ChipModule,
  TabViewModule,
  TimelineModule
]

@NgModule({
  declarations: [
    ...COMPONENT,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ...MATERIAL_MODULES,
    ...PRIME_NG_MODULES
  ],
  exports:[
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    ...COMPONENT,
    ...MATERIAL_MODULES,
    ...PRIME_NG_MODULES,
  ]
})
export class SharedModule { }
