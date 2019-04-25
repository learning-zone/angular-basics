// This file contains the main class as well as the necessary
// decorators for creating the `PrdRoot` `component`

/*
 * Angular 2 decorators and services
 */
//import {Component} from '@@angularcore';


import {Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy} from '@angular/core';
  
//import {RouteConfig, Router, RouterOutlet} from '@angular/router';
import {RouteConfig, Router} from '@angular/router-deprecated';

import {PrdListComponent} from './prd-list.component';
import {PrdDetailComponent} from './prd-detail.component';
import {PrdService} from './prd.service';

/*
 * Prd
 * Root Component
 */
@Component({
  providers: [PrdService],
  directives: [RouterOutlet],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `<router-outlet></router-outlet>`
})
@RouteConfig([
  {path:'/', name: 'PrdList', component: PrdListComponent, useAsDefault: true},
  {path:'/:id', name: 'PrdDetail', component: PrdDetailComponent}
])
export class PrdRoot {

  constructor() {

  }
}
