import { Routes } from '@angular/router';
import { LandingComponent } from './utils/components/landing/landing.component';

export const routes: Routes = [
    { path: '', component: LandingComponent, pathMatch: 'full' },
];
