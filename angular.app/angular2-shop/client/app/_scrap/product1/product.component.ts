// This file contains the main class as well as the necessary
// decorators for creating the `Product` component

/*
 * Angular 2 decorators and services
 */
//import {Component} from '@angularcore';

import {Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy} from '@angular/core';
/*
 * Product
 * Component
 */
@Component({
  selector: 'product',
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./product.component.html'),
  // Load our main `Sass` file into our `Product` component
  //styleUrls: [require('!style!css!sass!./product.component.scss')],
  providers: [],
  directives: [],
  pipes: []
})

export class Product {

  constructor() {}
}
