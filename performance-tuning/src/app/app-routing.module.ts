import * as core from '@angular/core';
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
import { LazyComponentComponent } from './components/pages/routing/lazy-component/lazy-component.component';
import { LazyLoadingComponent } from './components/pages/routing/lazy-loading/lazy-loading.component';
import { UserComponent } from './components/pages/routing/lazy-loading/user/user.component';
import { DashboardComponent } from './components/pages/routing/lazy-loading/dashboard/dashboard.component';


const routes: Routes = [

  { path: '', redirectTo: 'components/home', pathMatch: 'full', data: {title: 'Home | Angular Material'}},

  { path: 'components/home', component: HomeComponent, data: {title: 'Home | Angular Material'}},
  { path: 'components/material-datatable', component: SortHeaderComponent, data: {title: 'Material Datatable | Angular Material'}},
  { path: 'components/datatable', component: DatatableComponent, data: {title: 'DataTables | Angular Material'}},
  { path: 'components/lazy-component', component: LazyComponentComponent, data: {title: 'Lazy Component | Angular Material'}},
  { path: 'components/lazy-loading', component: LazyLoadingComponent, data: {title: 'Lazy Component | Angular Material'},
    children: [
      { path: 'user', loadChildren: () => import('./components/pages/routing/lazy-loading/user/user.module').then(m => m.UserModule) },
      // tslint:disable-next-line: max-line-length
      { path: 'dashboard', loadChildren: () => import('./components/pages/routing/lazy-loading/dashboard/dashboard.module').then(m => m.DashboardModule) },
    ]
  },

  { path: 'cdk/drag-drop', component: DragDropComponent, data: {title: 'DragDrop | Angular Material'}},
  { path: 'cdk/platform', component: PlatformComponent, data: {title: 'Platform | Angular Material'}},
  { path: 'cdk/portal', component: PortalComponent, data: {title: 'Portal | Angular Material'}},
  { path: 'cdk/scrolling', component: ScrollingComponent, data: {title: 'Scrolling | Angular Material'}},
  { path: 'cdk/text-field', component: TextFieldComponent, data: {title: 'TextField | Angular Material'}}
  // { path: '**', component: PageNotFoundComponent, data: {title: 'Page Not Found | Angular Material'}}
];

@core.NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
