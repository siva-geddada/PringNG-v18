import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, fromEvent, merge, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NetworkStatusService {
  private onlineStatus$ = new BehaviorSubject<boolean>(true);  // Default to true, change as needed

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    // Only run this check in the browser
    if (isPlatformBrowser(this.platformId)) {
      // Emit event when user goes online
      const online$ = fromEvent(window, 'online').pipe(map(() => true));

      // Emit event when user goes offline
      const offline$ = fromEvent(window, 'offline').pipe(map(() => false));

      // Merge the two observables and update the BehaviorSubject accordingly
      merge(online$, offline$).subscribe(this.onlineStatus$);

      // Set the initial network status
      this.onlineStatus$.next(navigator.onLine);
    } else {
      // For non-browser platforms, assume online
      this.onlineStatus$ = new BehaviorSubject<boolean>(true);
    }
  }

  // Return an observable for components to listen to network changes
  getNetworkStatus(): Observable<boolean> {
    return this.onlineStatus$.asObservable();
  }
}
