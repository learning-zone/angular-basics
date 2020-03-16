import * as core from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SortHeaderComponent } from '../app/components/sort-header/sort-header.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { LazyComponentComponent } from './components/routing/lazy-component/lazy-component.component';
import { LazyLoadingComponent } from './components/routing/lazy-loading/lazy-loading.component';
import { ScrollingComponent } from './components/scrolling/scrolling.component';
import { TrackbyComponent } from './components/runtime-optimizations/trackby/trackby.component';


const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full', data: {title: 'Home | Angular Material'}},

  { path: 'home', component: HomeComponent, data: {title: 'Home | Angular Material'}},
  { path: 'material-datatable', component: SortHeaderComponent, data: {title: 'Material Datatable | Angular Material'}},
  { path: 'datatable', component: DatatableComponent, data: {title: 'DataTables | Angular Material'}},
  { path: 'lazy-component', component: LazyComponentComponent, data: {title: 'Lazy Component | Angular Material'}},
  { path: 'lazy-loading', component: LazyLoadingComponent, data: {title: 'Lazy Component | Angular Material'},
    children: [
      { path: 'user', loadChildren: () => import('./components/routing/lazy-loading/user/user.module').then(m => m.UserModule) },
      // tslint:disable-next-line: max-line-length
      { path: 'dashboard', loadChildren: () => import('./components/routing/lazy-loading/dashboard/dashboard.module').then(m => m.DashboardModule) },
    ]
  },
  { path: 'virtual-scrolling', component: ScrollingComponent, data: {title: 'Scrolling | Angular Material'}},
  { path: 'track-by', component: TrackbyComponent, data: {title: 'TrackBy | Angular Material'}}
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
