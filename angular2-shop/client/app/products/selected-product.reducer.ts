// ```
// selected-product.reducer.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// selected-product.reducer.js may be freely distributed under the MIT license
// ```

// # Redux interface/reducer for `products`

// The `selected product` reducer handles the currently
// selected product
export const selectedProduct = (state: any = null, {type, payload}) => {

  // DEBUG
  console.log('selected product reducer hit! type: ');
  console.log(type);
  console.log('payload: ');
  console.log(payload);
  console.log('state: ');
  console.log(state);

  switch (type) {

    // When an `event` from our store is dispatched with an action
    // type of `SELECT_PRODUCT`, it will hit this switch case
    case 'SELECT_PRODUCT':
      return payload;

    default:
      return state;
  }
};
