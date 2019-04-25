import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

function type(action) {
  return action;
}

export const ActionTypes = {
  SEARCH:           type('[Cart] Search'),
  SEARCH_COMPLETE:  type('[Cart] Search Complete'),
  LOAD:             type('[Cart] Load'),
  SELECT:           type('[Cart] Select'),
  ADD_TO_CART:      type('[Cart] Add'),
  REMOVE_FROM_CART:      type('[Cart] Remove'),
};

@Injectable()
export class CartAction {

    constructor(private store: Store<any>) {

    }
    getState(): Observable<any> {
        return this.store.select('cart');
    }

    addToCart(product, quantity) {
        console.log('add,', product)
        this.store.dispatch({
            type: ActionTypes.ADD_TO_CART,
            payload: {
                product,
                quantity
            }
        })
    }

    removeFromCart(payload) {
        console.log('remove,', payload)
        this.store.dispatch({
            type: ActionTypes.REMOVE_FROM_CART,
            payload: payload
        })
    }

}