import * as core from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SortHeaderComponent } from '../app/components/sort-header/sort-header.component';

import { DatatableComponent } from './components/datatable/datatable.component';
import { LazyComponentComponent } from './components/routing/lazy-component/lazy-component.component';
import { LazyLoadingComponent } from './components/routing/lazy-loading/lazy-loading.component';
import { UserComponent } from './components/routing/lazy-loading/user/user.component';
import { DashboardComponent } from './components/routing/lazy-loading/dashboard/dashboard.component';
import { ScrollingComponent } from './components/scrolling/scrolling.component';


const routes: Routes = [

  { path: '', redirectTo: 'components/home', pathMatch: 'full', data: {title: 'Home | Angular Material'}},

  { path: 'components/home', component: HomeComponent, data: {title: 'Home | Angular Material'}},
  { path: 'components/material-datatable', component: SortHeaderComponent, data: {title: 'Material Datatable | Angular Material'}},
  { path: 'components/datatable', component: DatatableComponent, data: {title: 'DataTables | Angular Material'}},
  { path: 'components/lazy-component', component: LazyComponentComponent, data: {title: 'Lazy Component | Angular Material'}},
  { path: 'components/lazy-loading', component: LazyLoadingComponent, data: {title: 'Lazy Component | Angular Material'},
    children: [
      { path: 'user', loadChildren: () => import('./components/routing/lazy-loading/user/user.module').then(m => m.UserModule) },
      // tslint:disable-next-line: max-line-length
      { path: 'dashboard', loadChildren: () => import('./components/routing/lazy-loading/dashboard/dashboard.module').then(m => m.DashboardModule) },
    ]
  },
  { path: 'components/scrolling', component: ScrollingComponent, data: {title: 'Scrolling | Angular Material'}}
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
