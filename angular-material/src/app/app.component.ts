import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-material';
  showFiller = false;
  config = {
    panels: [
      {
        name: 'Section 1',
        description: 'First section',
        component: {
          selector: 'app-sidebar-widget-1',
          settings: {}
        }
      },
      {
        name: 'Section 2',
        description: 'Second section',
        component: {
          selector: 'app-sidebar-widget-2',
          settings: {}
        }
      },
      {
        name: 'Section 3',
        description: 'Third section',
        component: {
          selector: 'app-sidebar-widget-3',
          settings: {}
        }
      }
    ]
  };
}
