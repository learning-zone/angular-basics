// ```
// product-list.component.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// product-list.component.js may be freely distributed under the MIT license
// ```

// # Product List

import {Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import {ProductService} from './product.service';
import {Product} from './product.store';
import {AppStore} from '../app.store';

//import {Rating} from './rating.component';

@Component({
  selector: 'product-list',
  template: require('./product-list.html'),
  directives: [
  //Rating
  ]
})
export class ProductList {
  // The `product` component hands off `products` and `selectedproduct`
  // via property bindings to its child components
  // Here we pick up the `products` collection by annotating our local
  // `products` property with `@Input()`
  @Input() products: Product[];
  // Two event outputs for when a product is selected or deleted
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
