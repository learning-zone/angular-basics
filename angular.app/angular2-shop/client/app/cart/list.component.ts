import {Component} from '@angular/core';

import {ProductService} from '../product/product.service';

import {ShopService} from '../shop/shop.service';

// We `import` `http` into our `ProductService` but we can only
// specify providers within our component
import {HTTP_PROVIDERS} from '@angular/http';

// Import NgFor directive
import {NgFor} from '@angular/common';

import {UserService} from '../auth/user.service';


import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';

import {MdSwitch} from "ng2-material";
//import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from
//'@angular/router';
import {RouteConfig, Router, RouteParams} from '@angular/router-deprecated';


import {FormBuilder, ControlGroup, Validators} from '@angular/common';


import {CartLine} from './line.component';

// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'cart-list',
  
//    providers: [...HTTP_PROVIDERS, ProductService],

    providers: [
        ...HTTP_PROVIDERS,
        ProductService,
        ShopService,
        ANGULAR2_GOOGLE_MAPS_PROVIDERS,
  //      AuthService
    ],
    directives: [
        MdSwitch,
        ANGULAR2_GOOGLE_MAPS_DIRECTIVES,
        CartLine
//        RouterActive
    ],
    //encapsulation: ViewEncapsulation.None,
    pipes: [],
    styles: [`
    .sebm-google-map-container {
      height: 200px;
    }
  `],
    template: require('./list.html')
})


export class CartList {
    public shop: any;

    myForm: ControlGroup;
    error: string;
    public shopId: string;
  // Initialize our `productData.text` to an empty `string`
  productData = {
    text: ''
  };
  url = 'https://google.com/';
  public latitude: number = 51.678418;
  public longitude: number = 7.809007;
  public zoom: number = 16;

  public isPickup = false;
  public isDelivery = false;
  public isVeg = true;

  mode='';
  currentItem= {text:'',userId:''};
  private products: Array<any> = [];

  private items: Array<any> = [];

  constructor(public params: RouteParams,
      public productService: ProductService,
      public shopService: ShopService,      
      public u: UserService)
  {
      this.items = this.u.cartItems;
	  
      let fb = new FormBuilder();

      this.myForm = fb.group({
          title: ['', Validators.required],
          cuisine: ['', Validators.required],
          price: ['', Validators.required],
          url: [''],
          imageUrl: [''],
          image: [''],
          isVeg: [''],
          isDelivery: [''],
          isPickup: ['']

      });

      
  }

  order() {
      alert('order');
      this.u.order().subscribe((res) => {
          alert('Contine Shoping');


      });
      
  }

  
}
