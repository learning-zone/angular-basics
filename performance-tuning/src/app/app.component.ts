import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SidebarService } from './shared/sidebar/sidebar.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  menus = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sidebarservice: SidebarService,
    private titleService: Title) {
    this.menus = sidebarservice.getMenuList();
  }

  ngOnInit() {
    const appTitle = this.titleService.getTitle();
    this.router
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          const child = this.activatedRoute.firstChild;
          if (child.snapshot.data.title) {
            return child.snapshot.data.title;
          }
          return appTitle;
        })
      ).subscribe((title: string) => {
        this.titleService.setTitle(title);
      });
  }
}

if (typeof Worker !== 'undefined') {
  // Create a new
  const worker = new Worker('./app.worker', { type: 'module' });
  worker.onmessage = ({ data }) => {
    console.log(`page got message: ${data}`);
  };
  worker.postMessage('hello');
} else {
  // Web Workers are not supported in this environment.
  // You should add a fallback so that your program still executes correctly.
}
