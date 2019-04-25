// Import our `Product` store
import {Product} from './products/product.store';

// We are dealing with a single object that has:
//   * An `products` collection
//   * A `selectedProduct` property holding a single `Product`
export interface AppStore {

    products: Product[];
    selectedProduct: Product;

    // If ever you were to desire more functionality, you
    // could expand the `store` with new `key, value` pairs
    // to accomodate the updated model
    //
    // . . .
    //
};
