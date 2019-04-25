// ```
// product.service.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// product.service.js may be freely distributed under the MIT license
// ```

// # Product Service

import {Http, Headers} from '@angular/http';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Product} from './product.store';
import {AppStore} from '../app.store';

const HEADER = {
  headers: new Headers({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class ProductService {

  products: Observable<Array<Product>>;

  // Inject the `AppStore` into the constructor with a type of `AppStore`
  constructor(private http: Http, private store: Store<AppStore>) {

    // Bind an observable of our `products` to `ProductService`
    // Since this is essentially a `key, value` system, we can
    // set our `products` by calling `store.select('products')`
    this.products = store.select('products');
  }

  loadProducts() {

        this.http.get('/api/product')
            // map the `HTTP` response from `raw` to `JSON` format
            // using `RxJs`
            // Reference: https://github.com/Reactive-Extensions/RxJS
            .map(res => res.json())
            // call `map` again to create the object we want to dispatch
            // to our reducer
            // This combo of `map` method calls is an observable sequence
            // in that every result gets passed through this sequence of
            // operations
            .map(payload => ({ type: 'ADD_PRODUCTS', payload }))
            // Subscribe to this sequence and hand off control to the
            // reducer by dispatching the transformed results
            .subscribe(action => this.store.dispatch(action));
    }

    saveProduct(product: Product) {

        (product._id) ? this.updateProduct(product) : this.createProduct(product);
    }

    createProduct(product: Product) {

        this.http.post('/api/product', JSON.stringify(product), HEADER)
            .map(res => res.json())
            .map(payload => ({ type: 'CREATE_PRODUCT', payload }))
            .subscribe(action => this.store.dispatch(action));
    }

    updateProduct(product: Product) {

        this.http.put(`/api/product/${product._id}`, JSON.stringify(product), HEADER)
          // Dispatch action to reducer in subscribe block here
          .subscribe(action => this.store.dispatch({ type: 'UPDATE_PRODUCT', payload: product }));
    }

    deleteProduct(product: Product) {

        this.http.delete(`/api/product/${product._id}`)
          .subscribe(action => this.store.dispatch({ type: 'DELETE_PRODUCT', payload: product }));
    }
}
