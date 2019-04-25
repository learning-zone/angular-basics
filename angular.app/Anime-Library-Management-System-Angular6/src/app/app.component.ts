import { Component } from '@angular/core';
import { SpinnerService } from './services/spinner.service';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = `Abhishek's Anime Library`;

  constructor(public spinner: SpinnerService, private router: Router){
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    })
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.spinner.start();
    }
    if (event instanceof NavigationEnd) {
      setTimeout(() => {
        this.spinner.stop();
      }, 2000);
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      setTimeout(() => {
        this.spinner.stop();
      }, 2000);
    }
    if (event instanceof NavigationError) {
      setTimeout(() => {
        this.spinner.stop();
      }, 2000);
    }
  }
 
}
