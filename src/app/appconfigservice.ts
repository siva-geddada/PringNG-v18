import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export interface AppState {
    configActive?: boolean;
    menuActive?: boolean;
    newsActive?: boolean;
    announcement?: any;
}


@Injectable({
    providedIn: 'root',
})
export class AppConfigService {
    state: AppState = {
        configActive: false,
        menuActive: false,
        newsActive: false,
    };

    appState = signal<any>({
        preset: 'Aura',
        primary: 'noir',
        surface: null,
        darkTheme: false,
    });

    document = inject(DOCUMENT);

    platformId = inject(PLATFORM_ID);

    theme = computed(() => (this.appState().darkTheme ? 'dark' : 'light'));

    constructor() {
        effect(() => {
            const state = this.appState();

            if (isPlatformBrowser(this.platformId)) {
                (document as any).startViewTransition(() => {
                    if (state.darkTheme) {
                        this.document.documentElement.classList.add('p-dark');
                    } else {
                        this.document.documentElement.classList.remove('p-dark');
                    }
                });
            }
        });
    }

    showMenu() {
        this.state.menuActive = true;
    }

    hideMenu() {
        this.state.menuActive = false;
    }

    showConfig() {
        this.state.configActive = true;
    }

    hideConfig() {
        this.state.configActive = false;
    }

    showNews() {
        this.state.newsActive = true;
    }

    hideNews() {
        this.state.newsActive = false;
    }
}
