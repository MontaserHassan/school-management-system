import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { ConfigConstant } from '../../config/config.constant';
import { LayoutService } from '../../services/general/layout.service';
import { ScreenSizes } from '../../enums/screen-sizes.enum';
import { ScreenType } from '../../enums/screen-type.enum';
import { StorageConstant } from '../../config/storage.constant';

@Component({
  selector: 'app-change-language-button',
  templateUrl: './change-language-button.component.html',
  styleUrls: ['./change-language-button.component.scss']
})
export class ChangeLanguageButtonComponent implements OnInit {
  items!: MenuItem[];
  savedLang = localStorage.getItem(StorageConstant.LANGUAGE) || ConfigConstant.DEFAULT_LANGUAGE;
  size!: number

  protected ScreenSizes = ScreenSizes

  constructor(private translate: TranslateService, private LayoutService: LayoutService) {
    this.translate.setDefaultLang(this.savedLang);
    this.translate.use(this.savedLang);
  }

  ngOnInit() {
    this.size = this.LayoutService.currentScreenWidth
    this.LayoutService.currentScreenWidth$.subscribe((size) => {
      this.size = size
    });
    this.setupItems();
  }

  setupItems() {
    this.items = [
      {
        label: this.translate.instant('English'),
        icon: '/assets/icons/en.png',
        command: () => this.switchLanguage('en')
      },
      {
        label: this.translate.instant('French'),
        icon: '/assets/icons/fr.png',
        command: () => this.switchLanguage('fr')
      },
      {
        label: this.translate.instant('German'),
        icon: '/assets/icons/du.png',
        command: () => this.switchLanguage('du')
      }
    ];
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    this.savedLang = language;
    localStorage.setItem(StorageConstant.LANGUAGE, language);
    window.location.reload();
  }
}
