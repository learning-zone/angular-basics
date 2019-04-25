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
  ChangeDetectionStrategy} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {AppStore} from '../app.store';

import {Product} from './product.store';
import {ProductService} from './product.service';
import {ProductDetails} from './product-details.component';
import {ProductList} from './product-list.component';

@Component({
  selector: 'products',
  providers: [],
  template: require('./products.html'),
  directives: [ProductList, ProductDetails],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Products {

  mode='';
  
  products: Observable<Array<Product>>;

  selectedProduct: Observable<Product>;

  constructor(private productService: ProductService,
              private store: Store<AppStore>) {

    // Bind to the `products` observable on `ProductService`
    this.products = productService.products;

    // Bind the `selectedProduct` observable from the store
    this.selectedProduct = store.select('selectedProduct');

    // DEBUG
    this.selectedProduct.subscribe(v => console.log(v));

    // `productService.loadProducts` dispatches the `ADD_PRODUCTS` event
    // to our store which in turn updates the `products` collection
    productService.loadProducts();
  }
changeMode(newMode) {

      this.mode=newMode;
      //this.mode='edit';
  }

  selectProduct(product: Product) {

    this.store.dispatch({

      type: 'SELECT_PRODUCT',
      payload: product
    });
  }

  deleteProduct(product: Product) {

    this.productService.deleteProduct(product);
  }

  resetProduct() {

    let emptyProduct: Product = {

      _id: null,
      tags: [],
      //amount:0,
      title: '',
      amount:'0',
      description: '',
      rating: null,
      creator: '',
      ingredients: [],
      directions: []
    };

    this.store.dispatch({

      type: 'SELECT_PRODUCT',
      payload: emptyProduct
    });
  }

  saveProduct(product: Product) {

    this.productService.saveProduct(product);
    this.resetProduct();
  }
}
