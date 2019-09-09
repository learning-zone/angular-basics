import { Component } from '@angular/core';
import { SidebarService } from './components/sidebar/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  menus = [];
  constructor(public sidebarservice: SidebarService){
    this.menus = sidebarservice.getMenuList();
  }
}
