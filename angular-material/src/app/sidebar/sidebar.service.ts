import { Injectable, Type } from '@angular/core';
import { SidebarWidgetOneComponent } from './sidebar-widget-one/sidebar-widget-one.component';
import { SidebarWidgetTwoComponent } from './sidebar-widget-two/sidebar-widget-two.component';
import { SidebarWidgetThreeComponent } from './sidebar-widget-three/sidebar-widget-three.component';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  widgets: { [id: string]: Type<{}> } = {
    'app-sidebar-widget-one': SidebarWidgetOneComponent,
    'app-sidebar-widget-two': SidebarWidgetTwoComponent,
    'app-sidebar-widget-three': SidebarWidgetThreeComponent
  };  
}

