import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AppNewsComponent } from '../news/app.news.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AppConfigService } from '../../services/appconfig.service';
import { AppTopBarComponent } from '../../../layout/topbar/app.topbar.component';
import { AppOnlineStatusComponent } from '../appOnlineStatus/appOnlineStatus.component';
@Component({
  selector: 'landing',
  standalone: true,
  templateUrl: './landing.component.html',
  imports: [
    CommonModule,
    NgOptimizedImage,
    AppNewsComponent,
    AppTopBarComponent,
    AppOnlineStatusComponent,
  ],
})
export class LandingComponent implements OnInit {
  subscription!: Subscription;

  constructor(private configService: AppConfigService) {}

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

  ngOnInit() {}
}
