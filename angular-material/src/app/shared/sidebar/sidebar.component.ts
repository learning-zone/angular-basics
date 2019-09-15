import { Component } from '@angular/core';
import { SidebarService } from './sidebar.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menus = [];
  days = [];
  constructor(
    public sidebarservice: SidebarService
    ) {
    this.menus = sidebarservice.menus;
    this.days = sidebarservice.days;
  }

}
