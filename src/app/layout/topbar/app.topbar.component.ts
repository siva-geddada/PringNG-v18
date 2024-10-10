import { DomHandler } from 'primeng/dom';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AppConfigService } from '../../utils/services/appconfig.service';
import { AppConfiguratorComponent } from '../../utils/components/configurator/app.configurator.component';
import { Component, ElementRef, Inject, Input, OnDestroy, Renderer2, afterNextRender, booleanAttribute } from '@angular/core';

@Component({
    selector: 'app-topbar',
    standalone: true,
    templateUrl: './app.topbar.component.html',
    imports: [CommonModule, FormsModule, StyleClassModule, RouterModule, AppConfiguratorComponent],
})
export class AppTopBarComponent implements OnDestroy {
    @Input({ transform: booleanAttribute }) showConfigurator = true;

    @Input({ transform: booleanAttribute }) showMenuButton = true;

    scrollListener: VoidFunction | null | undefined;

    private window: Window;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private el: ElementRef,
        private renderer: Renderer2,
        private configService: AppConfigService,
    ) {
        this.window = this.document.defaultView as Window;

        afterNextRender(() => {
            this.bindScrollListener();
        });
    }

    get isDarkMode() {
        return this.configService.appState().darkTheme;
    }

    toggleMenu() {
        if (this.configService.state.menuActive) {
            this.configService.hideMenu();
            DomHandler.unblockBodyScroll('blocked-scroll');
        } else {
            this.configService.showMenu();
            DomHandler.blockBodyScroll('blocked-scroll');
        }
    }

    showConfig() {
        this.configService.showConfig();
    }

    toggleDarkMode() {
        this.configService.appState.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }

    bindScrollListener() {
        if (!this.scrollListener) {
            this.scrollListener = this.renderer.listen(this.window, 'scroll', () => {
                if (this.window.scrollY > 0) {
                    this.el.nativeElement.children[0].classList.add('layout-topbar-sticky');
                } else {
                    this.el.nativeElement.children[0].classList.remove('layout-topbar-sticky');
                }
            });
        }
    }

    unbindScrollListener() {
        if (this.scrollListener) {
            this.scrollListener();
            this.scrollListener = null;
        }
    }

    ngOnDestroy() {
        this.unbindScrollListener();
    }
}
