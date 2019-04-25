// ```
// products.component.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// products.component.js may be freely distributed under the MIT license
// ```

// # Products Component

import {Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import {ProductService} from './product.service';
import {Product} from './product.store';
import {AppStore} from '../app.store';

//import {Rating} from './rating.component';

@Component({
  selector: 'product-detail',
  template: require('./product-details.html'),
  directives: [
	//Rating
  ]
})
export class ProductDetails {

  originalTitle: string;
  selectedProduct: Product;

  // Assign our `product` to a locally scoped property
  // Perform additional logic on every update via ES6 setter
  // Create a copy of `_product` and assign it to `this.selectedProduct`
  // which we will use to bind our form to
  @Input('product') set _product(value: Product) {

    if (value) this.originalTitle = value.title;
    this.selectedProduct = Object.assign({}, value);

    // DEBUG
    console.log('this.selectedProduct: ');
    console.log(this.selectedProduct);
  }

  // Allow the user to save/delete a `product or cancel the
  // operation. Flow events up from here.
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  constructor() {

  }

  // Whenever the user needs to add a new `tag`, push an
  // empty `tag` object to the `tags` array on the
  // `selectedProduct`
  newTag() {

    // blank `tag` object
    let tag = {
      name: ''
    };

    // Check to see if the `tags` array exists before
    // attempting to push a `tag` to it
    if (!this.selectedProduct.tags)
      this.selectedProduct.tags = [];

    this.selectedProduct.tags.push(tag);
  }

  // Whenever the user needs to add a new `ingredient`, push an
  // empty `ingredient` object to the `ingredient` array on the
  // `selectedProduct`
  newIngredient() {

    // blank `ingredient` object
    let ingredient = {
      amount: '',
      unit: '',
      name: ''
    };

    // Check to see if the `ingredients` array exists before
    // attempting to push an `ingredient` to it
    if (!this.selectedProduct.ingredients)
      this.selectedProduct.ingredients = [];

    this.selectedProduct.ingredients.push(ingredient);
  }

  // Whenever the user needs to add a new `direction`, push an
  // empty `direction` object to the `direction` array on the
  // `selectedProduct`
  newDirection() {

    // blank `direction` object
    let direction = {
      step: ''
    };

    // Check to see if the `directions` array exists before
    // attempting to push a `direction` to it
    if (!this.selectedProduct.directions)
      this.selectedProduct.directions = [];

    this.selectedProduct.directions.push(direction);
  }

  onUpdate(value) {

    // Set the value of the selected product's rating to the
    // value passed up from the `rating` component
    this.selectedProduct.rating = value;
  }

  deleteTag(tag) {
    // loop through all of the `tags` in the `selectedProduct`
    for (let i = 0; i < this.selectedProduct.tags.length; i++) {
      // if the `tag` at the current index matches that of the one
      // the user is trying to delete
      if (this.selectedProduct.tags[i] === tag) {
        // delete the `tag` at the current index
        this.selectedProduct.tags.splice(i, 1);
      }
    }
  }

  deleteIngredient(ingredient) {
    // loop through all of the `ingredients` in the `selectedProduct`
    for (let i = 0; i < this.selectedProduct.ingredients.length; i++) {
      // if the `ingredient` at the current index matches that of the one
      // the user is trying to delete
      if (this.selectedProduct.ingredients[i] === ingredient) {
        // delete the `ingredient` at the current index
        this.selectedProduct.ingredients.splice(i, 1);
      }
    }
  }

  deleteDirection(step) {
    // loop through all of the `directions` in the `selectedProduct`
    for (let i = 0; i < this.selectedProduct.directions.length; i++) {
      // if the `direction` at the current index matches that of the one
      // the user is trying to delete
      if (this.selectedProduct.directions[i] === step) {
        // delete the `direction` at the current index
        this.selectedProduct.directions.splice(i, 1);
      }
    }
  }
}
