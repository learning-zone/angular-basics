// ```
// products.store.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// products.store.js may be freely distributed under the MIT license
// ```

// # Redux store for `products`

export interface Product {
  _id: number;
  tags: Array<Object>;
  title: string;
  amount: string;
  
  description: string;
  rating: number;
  creator: string;
  ingredients: Array<Object>;
  directions: Array<Object>;
};
