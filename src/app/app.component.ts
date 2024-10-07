import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AppConfiguratorComponent } from './configurator/app.configurator.component';
import { AppConfigService } from './appconfigservice';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppTopBarComponent } from './layout/topbar/app.topbar.component';
import { Subscription } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  templateUrl: './app.component.html',
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    AppConfiguratorComponent,
    CommonModule,
    StyleClassModule,
    AppTopBarComponent,
  ],
})
export class AppComponent {
  subscription!: Subscription;

  constructor(
    private configService: AppConfigService,
    private metaService: Meta,
    private titleService: Title
  ) {}

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
