import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadingRoutingModule } from './lazy-loading-routing.module';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  imports: [
    CommonModule,
    LazyLoadingRoutingModule
  ],
  declarations: [UserComponent, DashboardComponent]
})
export class LazyLoadingModule { }
