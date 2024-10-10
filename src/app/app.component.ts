import { Subscription } from 'rxjs';
import { Component } from '@angular/core';
import Noir from './utils/themes/app-theme';
import { PrimeNGConfig } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { Meta, Title } from '@angular/platform-browser';
import { AppConfigService } from './utils/services/appconfig.service';
import { AppTopBarComponent } from './layout/topbar/app.topbar.component';
import { AppNewsComponent } from './utils/components/news/app.news.component';
import { AppConfiguratorComponent } from './utils/components/configurator/app.configurator.component';

@Component({
  templateUrl: './app.component.html',
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ButtonModule,
    MessageModule,
    InputTextModule,
    StyleClassModule,
    AppNewsComponent,
    AppTopBarComponent,
    AppConfiguratorComponent,
  ],
})
export class AppComponent {
  subscription!: Subscription;

  constructor(
    private metaService: Meta,
    private titleService: Title,
    private primeng: PrimeNGConfig,
    private configService: AppConfigService
  ) {
    this.primeng.theme.set(Noir);
  }

  get landingClass() {
    return {
      'layout-dark': this.isDarkMode,
      'layout-light': !this.isDarkMode,
      'layout-news-active': this.isNewsActive,
    };
  }

  get isDarkMode() {
    return this.configService.appState().darkTheme;
  }

  get isNewsActive() {
    return this.configService.state.newsActive;
  }

  ngOnInit() {
    this.titleService.setTitle('PrimeNG - Angular UI Component Library');
    this.metaService.updateTag({
      name: 'description',
      content:
        'The ultimate collection of design-agnostic, flexible and accessible Angular UI Components.',
    });
 
  }

  
}
