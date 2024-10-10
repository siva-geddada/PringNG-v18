import { ChangeDetectorRef, Component } from '@angular/core';
import { NetworkStatusService } from '../../services/network-status.service';
import { MessageModule } from 'primeng/message';
import { NgClass, NgIf } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigService } from '../../services/appconfig.service';
import e from 'express';

@Component({
  selector: 'app-app-online-status',
  standalone: true,
  imports: [NgIf, NgClass, MessageModule, StyleClassModule],
  templateUrl: './appOnlineStatus.component.html',
  styles: `
   .online{
     background-color: #16a34a !important;
    }
    .offline{
      
      background-color: #dc2626 !important;
   }
  `,
})
export class AppOnlineStatusComponent {
  isOnline: boolean = true; 
  showOnlineMessage: boolean = false;
  previousOnlineStatus: boolean = true;

  constructor(
    private networkStatusService: NetworkStatusService,
    private appConfig: AppConfigService,
    private cdr: ChangeDetectorRef
  ) {
    this.onlineStatusCheck();
  }

  onlineStatusCheck() {
    this.appConfig.hideNews();
    this.networkStatusService
      .getNetworkStatus()
      .subscribe((status: boolean) => {
        console.log('✌️ status --->', status);
        this.isOnline = status;
        if (this.isOnline && !this.previousOnlineStatus) {
          this.showOnlineMessage = true;
          setTimeout(() => {
            this.showOnlineMessage = false;
            this.appConfig.hideNews();
            this.cdr.markForCheck();
          }, 3000);
        }
        if (!this.isOnline) {
          this.appConfig.showNews();
        }
        this.previousOnlineStatus = this.isOnline;
        this.cdr.markForCheck();
      });
  }
}
