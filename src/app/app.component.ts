import { booleanAttribute, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import Noir from './app-theme';
import { AppConfiguratorComponent } from './configurator/app.configurator.component';
import { AppConfigService } from './appconfigservice';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
    templateUrl: './app.component.html',
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule, RouterModule, ButtonModule, InputTextModule, AppConfiguratorComponent, CommonModule, StyleClassModule ]
})
export class AppComponent {
    @Input({ transform: booleanAttribute }) showConfigurator = true;

    constructor(private primeng: PrimeNGConfig, private configService: AppConfigService){
        this.primeng.theme.set(Noir);

    }
   
    get isDarkMode() {
        return this.configService.appState().darkTheme;
    }

    toggleDarkMode() {
        this.configService.appState.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
}