import {Component} from '@angular/core';

import {ProductService} from './product.service';

// We `import` `http` into our `ProductService` but we can only
// specify providers within our component
import {HTTP_PROVIDERS} from '@angular/http';

// Import NgFor directive
import {NgFor} from '@angular/common';

import {UserService} from '../auth/user.service';

// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'product',
    // Let Angular 2 know about `Http` and `ProductService`
    providers: [...HTTP_PROVIDERS, ProductService],
    template: require('./product.html')
})
export class Product {

  // Initialize our `productData.text` to an empty `string`
  productData = {
    text: ''
  };
  
  mode='';
  currentItem= {text:'',userId:''};
  public products: Array<any> = [];

  constructor(public productService: ProductService, private u: UserService) {
      console.log('Product constructor go!');
    //passing id
      productService.userId = u.id;
      productService.userId = u.id
      //this.products = [];
    productService.getUserProducts(u.id)
        // `Rxjs`; we subscribe to the response
        .subscribe((res) => {

            console.log(res);
            // Populate our `product` array with the `response` data
            this.products=res;
            // Reset `product` input
            this.productData.text = '';
        });
  }


changeMode(newMode) {

      this.mode=newMode;
      //this.mode='edit';
  }

  create() {
      this.currentItem.userId = this.u.id;  
      this.productService.create(this.currentItem)
        .subscribe((res) => {

            console.log(res);
            // Populate our `product` array with the `response` data

//            this.products = res;

            // Reset `product` input
            this.productData.text = '';
            this.mode='';
        });
  }
  
  save() {
    this.create();
    
  }

  selectItem(item) {
      //this.u.productId = item._id;
      //this.u.productTitle = item.title;

      this.currentItem = item;
      this.mode = 'edit';

  }

 startEdit(item) {
   this.currentItem = item;
   this.mode='edit';
    
  }
  
  delete(id) {

    this.productService.delete(id)
      .subscribe((res) => {

          // Populate our `product` array with the `response` data
          this.products = res;
      });
  }
}
