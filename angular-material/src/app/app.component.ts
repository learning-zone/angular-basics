import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  panelOpenState = false;
  config = {
    menus: [
      {
        name: 'Section 1',
        description: '',
        component: {
          selector: 'app-sidebar-widget-one',
          settings: {}
        }
      },
      {
        name: 'Section 2',
        description: '',
        component: {
          selector: 'app-sidebar-widget-two',
          settings: {}
        }
      },
      {
        name: 'Section 3',
        description: '',
        component: {
          selector: 'app-sidebar-widget-three',
          settings: {}
        }
      }
    ]
  };
}
