// ```
// products.reducer.js
// products.reducer.js may be freely distributed under the MIT license
// ```

// ** Import our `product` store
import {Product} from './product.store';

// # Redux reducer for `products`

// A traditional `reducer` is a function which takes a `state`
// object and an action to perform.

// `ngrx` reducers work differently:
//   * the second parameter is an object with the type of
//     action to perform and the payload for that action

// The `products` reducer performs actions on our list of `products`
// Notice that we set `state` to a default value to initialize
// smoothly
export const products = (state: any = [], {type, payload}) => {

  // DEBUG
  console.log('Products reducer hit! type: ');
  console.log(type);
  console.log('payload: ');
  console.log(payload);
  console.log('state: ');
  console.log(state);

  switch (type) {

    // `ADD_PRODUCTS` returns whatever collection passed in as a
    // new array
    case 'ADD_PRODUCTS':
      return payload;

    // `CREATE_PRODUCT` returns a new array by concatenating the
    // existing product array with our new product
    case 'CREATE_PRODUCT':
      return [...state, payload];

    // `UPDATE_PRODUCT` returns a new array by mapping to the current
    // array, locating the product to update and cloning to create
    // a new object using `Object.assign`
    case 'UPDATE_PRODUCT':
      return state.map(product => {

        return product._id === payload._id
          ? Object.assign({}, product, payload) : product;
      });

    // `DELETE_PRODUCT` returns a new array by filtering out the
    // `product` that we want to delete
    case 'DELETE_PRODUCT':

      return state.filter(product => {

        return product._id !== payload._id;
      });

    default:
      return state;
  }
};
