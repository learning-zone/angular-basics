import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { SortHeaderComponent } from '../app/components/pages/sort-header/sort-header.component';

import { DragDropComponent } from '../app/cdk/pages/drag-drop/drag-drop.component';
import { PlatformComponent } from '../app/cdk/pages/platform/platform.component';
import { PortalComponent } from '../app/cdk/pages/portal/portal.component';
import { ScrollingComponent } from '../app/cdk/pages/scrolling/scrolling.component';
import { TextFieldComponent } from '../app/cdk/pages/text-field/text-field.component';
import { DatatableComponent } from './components/pages/datatable/datatable.component';


const routes: Routes = [

  { path: '', redirectTo: 'components/home', pathMatch: 'full', data: {title: 'Home | Angular Material'}},

  { path: 'components/home', component: HomeComponent, data: {title: 'Home | Angular Material'}},
  { path: 'components/sort-header', component: SortHeaderComponent, data: {title: 'SortHeader | Angular Material'}},
  { path: 'components/datatable', component: DatatableComponent, data: {title: 'DataTables | Angular Material'}},

  { path: 'cdk/drag-drop', component: DragDropComponent, data: {title: 'DragDrop | Angular Material'}},
  { path: 'cdk/platform', component: PlatformComponent, data: {title: 'Platform | Angular Material'}},
  { path: 'cdk/portal', component: PortalComponent, data: {title: 'Portal | Angular Material'}},
  { path: 'cdk/scrolling', component: ScrollingComponent, data: {title: 'Scrolling | Angular Material'}},
  { path: 'cdk/text-field', component: TextFieldComponent, data: {title: 'TextField | Angular Material'}},

  // { path: '**', component: PageNotFoundComponent, data: {title: 'Page Not Found | Angular Material'}}

];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
