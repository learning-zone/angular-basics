// This file contains the main class as well as the necessary
// decorators for creating the  `PrdDetailComponent`

/*
 * Angular 2 decorators and services
 */

import {Component, OnInit} from '@angular/core';
import {Prd, PrdService} from './prd.service';
//import {RouteParams, Router} from '@angularrouter';
import {CanDeactivate, ComponentInstruction} from '@angular/router-deprecated';
import {RouteConfig, Router} from '@angular/router-deprecated';

/*
 * Prd
 * Detail Component
 */

@Component({
  // Load our main `Sass` file into our `PrdDetailComponent`
  styleUrls: [require('!style!css!sass!./prd-detail.component.scss')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./prd-detail.component.html')
})
export class PrdDetailComponent implements OnInit, CanDeactivate {

  prd: Prd;
  editName: string;

  constructor(
    private _service: PrdService,
    private _router: Router,
    private _routeParams: RouteParams
    ) { }

  ngOnInit() {
    let id = +this._routeParams.get('id');
    this._service.get(id).then(prd => {
      if (prd) {
        this.editName = prd.name;
        this.prd = prd;
      } else {
        this.gotoList();
      }
    });
  }

  routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction): any {
    if (!this.prd || this.prd.name === this.editName) {
      return true;
    }

    return new Promise<boolean>((resolve, reject) => resolve(window.confirm('Discard changes?')));
  }

  cancel() {
    this.editName = this.prd.name;
    this.gotoList();
  }

  save() {
    this.prd.name = this.editName;
    this.gotoList();
  }

  gotoList() {
    this._router.navigate(['PrdList']);
  }
}
