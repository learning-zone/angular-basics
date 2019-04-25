import {products} from './products.reducer';

import {selectedProduct} from './selected-product.reducer';

import {
  it,
  describe,
  expect
} from '@angular/core/testing';

describe('Products', () => {
  describe('`selectedProduct` store', () => {
    it('returns null by default', () => {
      let defaultState = selectedProduct(undefined, {type: 'random', payload: {}});

      expect(defaultState).toBeNull();
    });

    it('`SELECT_PRODUCT` returns the provided payload', () => {
      let selectProduct = selectedProduct(undefined, {type: 'SELECT_PRODUCT', payload: 'payload'});

      expect(selectProduct).toBe('payload');
    });
  });

  describe('`products` store', () => {
    let initialState = [
      { _id: 0, name: 'First Product' },
      { _id: 1, name: 'Second Product' }
    ];

    it('returns an empty array by default', () => {
      let defaultState = products(undefined, {type: 'random', payload: {}});

      expect(defaultState).toEqual([]);
    });

    it('`ADD_PRODUCTS`', () => {
      let payload = initialState,
          stateItems = products([], {type: 'ADD_PRODUCTS', payload: payload});

      expect(stateItems).toEqual(payload);
    });

    it('`CREATE_PRODUCT`', () => {
      let payload = {_id: 2, name: 'added product'},
          result = [...initialState, payload],
          stateItems = products(initialState, {type: 'CREATE_PRODUCT', payload: payload});

      expect(stateItems).toEqual(result);
    });

    it('`UPDATE_PRODUCT`', () => {
      let payload = { _id: 1, name: 'Updated Product' },
          result = [ initialState[0], { _id: 1, name: 'Updated Product' } ],
          stateItems = products(initialState, {type: 'UPDATE_PRODUCT', payload: payload});

      expect(stateItems).toEqual(result);
    });

    it('`DELETE_PRODUCT`', () => {
      let payload = { _id: 0 },
          result = [ initialState[1] ],
          stateItems = products(initialState, {type: 'DELETE_PRODUCT', payload: payload});

      // DEBUG
      console.log('result: ');
      console.log(result);

      expect(stateItems).toEqual(result);
    });
  });
});
