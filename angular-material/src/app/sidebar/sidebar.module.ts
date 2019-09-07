import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarWidgetOneComponent } from './sidebar-widget-one/sidebar-widget-one.component';
import { SidebarWidgetTwoComponent } from './sidebar-widget-two/sidebar-widget-two.component';
import { SidebarWidgetThreeComponent } from './sidebar-widget-three/sidebar-widget-three.component';
import { SidebarService  } from './sidebar.service';


@NgModule({
  declarations: [
    SidebarWidgetOneComponent, 
    SidebarWidgetTwoComponent, 
    SidebarWidgetThreeComponent
  ],
  imports: [
    CommonModule
  ],
  entryComponents: [
    SidebarWidgetOneComponent,
    SidebarWidgetTwoComponent,
    SidebarWidgetThreeComponent
  ],
  providers: [SidebarService]
})
export class SidebarModule { }
